from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime

from app.schemas.schemas import VolunteerCreate, VolunteerResponse
from app.utils.database import db
from app.routes.auth import verify_token, security

router = APIRouter()

@router.get("/", response_model=List[VolunteerResponse])
async def get_volunteers(location: str = None, status: str = None, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    query = {}
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if status:
        query["status"] = status
    
    volunteers = await db.volunteers.find(query).to_list(100)
    return [VolunteerResponse(**v) for v in volunteers]

@router.post("/register", response_model=VolunteerResponse)
async def register_volunteer(volunteer: VolunteerCreate, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    volunteer_dict = volunteer.dict()
    volunteer_dict["id"] = str(datetime.utcnow().timestamp())
    volunteer_dict["status"] = "available"
    volunteer_dict["registered_at"] = datetime.utcnow()
    
    await db.volunteers.insert_one(volunteer_dict)
    return VolunteerResponse(**volunteer_dict)

@router.post("/{volunteer_id}/assign")
async def assign_volunteer(volunteer_id: str, task: str, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    result = await db.volunteers.update_one(
        {"id": volunteer_id, "status": "available"},
        {"$set": {"status": "assigned", "assigned_task": task, "assigned_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Volunteer not available")
    
    return {"message": "Volunteer assigned successfully"}