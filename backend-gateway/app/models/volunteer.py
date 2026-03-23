from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr

class Volunteer(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    location: str
    skills: List[str] = []
    status: str = "available"  # available, assigned, busy
    assigned_task: Optional[str] = None
    registered_at: datetime = datetime.utcnow()