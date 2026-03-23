from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# Auth
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "user"
    phone: Optional[str] = None
    location: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Predictions
class UnifiedPredictionRequest(BaseModel):
    lat: float
    lng: float
    location: str

class EarthquakePrediction(BaseModel):
    status: str
    risk_probability: float
    risk_level: str
    magnitude_class: Optional[str] = None
    confidence: Optional[float] = None
    timestamp: Optional[str] = None

class RainfallPrediction(BaseModel):
    status: str
    rainfall_mm: float
    risk_probability: float
    risk_level: str
    confidence: Optional[float] = None

class FloodPrediction(BaseModel):
    status: str
    risk_probability: float
    risk_level: str
    severity: Optional[str] = None
    confidence: Optional[float] = None

class UnifiedPredictionResponse(BaseModel):
    earthquake: EarthquakePrediction
    rainfall: RainfallPrediction
    flood: FloodPrediction
    overall_risk: float
    location: str
    lat: float
    lng: float

# Alerts
class AlertCreate(BaseModel):
    message: str
    severity: str
    type: str

class AlertResponse(BaseModel):
    id: str
    message: str
    severity: str
    type: str
    read: bool
    created_at: datetime

# Resources
class ResourceCreate(BaseModel):
    name: str
    quantity: int
    threshold: int
    region: str

class ResourceResponse(BaseModel):
    id: str
    name: str
    quantity: int
    threshold: int
    region: str
    allocated: int

# Volunteers
class VolunteerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    location: str
    skills: List[str] = []

class VolunteerResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    location: str
    skills: List[str]
    status: str