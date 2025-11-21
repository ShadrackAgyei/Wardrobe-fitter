from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import uvicorn
import os

from database import engine, get_db
import models
import schemas
from services.image_service import ImageService
from services.ai_service import AIService

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Outfit Planner", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
os.makedirs("uploads/users", exist_ok=True)
os.makedirs("uploads/clothing", exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Initialize services
image_service = ImageService()
ai_service = AIService()


@app.get("/")
def read_root():
    return {"message": "Welcome to AI Outfit Planner API"}


@app.post("/api/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/api/users/{user_id}/photo")
async def upload_user_photo(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload user's full body photo"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save image
    file_path = await image_service.save_image(file, f"users/{user_id}")

    # Analyze body type with AI
    analysis = await ai_service.analyze_body_type(file_path)

    # Update user
    user.photo_url = file_path
    user.body_type = analysis.get("body_type")
    user.style_profile = analysis.get("style_suggestions")
    db.commit()

    return {
        "message": "Photo uploaded successfully",
        "photo_url": file_path,
        "analysis": analysis
    }


@app.post("/api/users/{user_id}/clothing", response_model=schemas.ClothingItem)
async def add_clothing_item(
    user_id: int,
    file: UploadFile = File(...),
    category: str = "other",
    db: Session = Depends(get_db)
):
    """Upload a clothing item or accessory"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save image
    file_path = await image_service.save_image(file, f"clothing/{user_id}")

    # Analyze clothing with AI
    analysis = await ai_service.analyze_clothing(file_path)

    # Create clothing item
    clothing = models.ClothingItem(
        user_id=user_id,
        image_url=file_path,
        category=analysis.get("category", category),
        color=analysis.get("color"),
        style=analysis.get("style"),
        season=analysis.get("season"),
        ai_tags=analysis.get("tags", [])
    )
    db.add(clothing)
    db.commit()
    db.refresh(clothing)

    return clothing


@app.get("/api/users/{user_id}/clothing", response_model=List[schemas.ClothingItem])
def get_user_wardrobe(user_id: int, db: Session = Depends(get_db)):
    """Get all clothing items for a user"""
    return db.query(models.ClothingItem).filter(
        models.ClothingItem.user_id == user_id
    ).all()


@app.post("/api/users/{user_id}/outfits/generate")
async def generate_outfit(
    user_id: int,
    occasion: Optional[str] = "casual",
    season: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Generate AI-powered outfit recommendations"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get user's wardrobe
    wardrobe = db.query(models.ClothingItem).filter(
        models.ClothingItem.user_id == user_id
    ).all()

    if not wardrobe:
        raise HTTPException(status_code=400, detail="No clothing items in wardrobe")

    # Generate outfit recommendations
    recommendations = await ai_service.generate_outfit_recommendations(
        user=user,
        wardrobe=wardrobe,
        occasion=occasion,
        season=season
    )

    return recommendations


@app.post("/api/users/{user_id}/outfits/save", response_model=schemas.Outfit)
async def save_outfit(
    user_id: int,
    outfit: schemas.OutfitCreate,
    db: Session = Depends(get_db)
):
    """Save an outfit combination"""
    db_outfit = models.Outfit(
        user_id=user_id,
        name=outfit.name,
        occasion=outfit.occasion,
        items=outfit.item_ids
    )
    db.add(db_outfit)
    db.commit()
    db.refresh(db_outfit)
    return db_outfit


@app.get("/api/users/{user_id}/outfits", response_model=List[schemas.Outfit])
def get_saved_outfits(user_id: int, db: Session = Depends(get_db)):
    """Get all saved outfits for a user"""
    return db.query(models.Outfit).filter(models.Outfit.user_id == user_id).all()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
