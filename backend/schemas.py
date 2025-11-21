from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: EmailStr


class User(BaseModel):
    id: int
    name: str
    email: str
    photo_url: Optional[str] = None
    body_type: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ClothingItemBase(BaseModel):
    category: str
    color: Optional[str] = None
    style: Optional[str] = None
    season: Optional[str] = None


class ClothingItem(ClothingItemBase):
    id: int
    user_id: int
    image_url: str
    ai_tags: Optional[List[str]] = []
    created_at: datetime

    class Config:
        from_attributes = True


class OutfitCreate(BaseModel):
    name: str
    occasion: str
    item_ids: List[int]


class Outfit(BaseModel):
    id: int
    user_id: int
    name: str
    occasion: str
    items: List[int]
    ai_score: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True
