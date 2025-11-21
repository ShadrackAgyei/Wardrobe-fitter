from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    photo_url = Column(String, nullable=True)
    body_type = Column(String, nullable=True)
    style_profile = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    clothing_items = relationship("ClothingItem", back_populates="user")
    outfits = relationship("Outfit", back_populates="user")


class ClothingItem(Base):
    __tablename__ = "clothing_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String, nullable=False)
    category = Column(String)  # top, bottom, dress, shoes, accessory
    color = Column(String)
    style = Column(String)  # casual, formal, sporty, etc.
    season = Column(String)  # spring, summer, fall, winter, all
    ai_tags = Column(JSON)  # Additional AI-generated tags
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="clothing_items")


class Outfit(Base):
    __tablename__ = "outfits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    occasion = Column(String)
    items = Column(JSON)  # List of clothing item IDs
    ai_score = Column(Integer)  # Style compatibility score
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="outfits")
