from typing import Dict
import logging
from datetime import datetime

from app.utils.database import db

logger = logging.getLogger(__name__)

class AllocationService:
    async def allocate(self, resource_id: str, quantity: int) -> Dict:
        resource = await db.resources.find_one({"id": resource_id})
        if not resource:
            return {"error": "Resource not found"}
        
        if resource["quantity"] - resource["allocated"] < quantity:
            return {"error": "Insufficient resources"}
        
        result = await db.resources.update_one(
            {"id": resource_id},
            {"$inc": {"allocated": quantity}, "$set": {"updated_at": datetime.utcnow()}}
        )
        
        return {"message": f"Allocated {quantity} units", "remaining": resource["quantity"] - resource["allocated"] - quantity}

allocation_service = AllocationService()