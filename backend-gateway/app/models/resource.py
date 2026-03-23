from datetime import datetime
from typing import List
from pydantic import BaseModel

class Resource(BaseModel):
    id: str
    name: str
    quantity: int
    threshold: int
    region: str
    allocated: int = 0
    updated_at: datetime = datetime.utcnow()