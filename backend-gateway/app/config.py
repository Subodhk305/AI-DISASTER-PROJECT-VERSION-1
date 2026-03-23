from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    APP_NAME: str = "AI Unified Disaster System"
    DEBUG: bool = True
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "disaster_system"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # ML Services URLs
    EARTHQUAKE_API_URL: str = os.getenv("EARTHQUAKE_API_URL", "http://localhost:8001")
    RAINFALL_API_URL: str = os.getenv("RAINFALL_API_URL", "http://localhost:8002")
    FLOOD_API_URL: str = os.getenv("FLOOD_API_URL", "http://localhost:8003")
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "alerts@disaster-system.com"
    
    # Alert thresholds
    EARTHQUAKE_THRESHOLD: float = 0.6
    RAINFALL_THRESHOLD: float = 50.0
    FLOOD_THRESHOLD: float = 0.6
    
    class Config:
        env_file = ".env"

settings = Settings()