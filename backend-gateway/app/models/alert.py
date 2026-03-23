from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Alert(BaseModel):
    id: str
    user_id: str
    message: str
    severity: str  # low, medium, high
    type: str  # earthquake, rainfall, flood
    location: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    read: bool = False
    created_at: datetime = datetime.utcnow()
    sent_at: Optional[datetime] = None