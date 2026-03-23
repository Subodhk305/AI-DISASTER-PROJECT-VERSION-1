from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime

from app.schemas.schemas import ResourceCreate, ResourceResponse
from app.utils.database import db
from app.routes.auth import verify_token, security
from app.services.allocation_service import allocation_service

router = APIRouter()

@router.get("/", response_model=List[ResourceResponse])
async def get_resources(region: str = None, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    query = {}
    if region:
        query["region"] = region
    
    resources = await db.resources.find(query).to_list(100)
    return [ResourceResponse(**r) for r in resources]

@router.post("/", response_model=ResourceResponse)
async def create_resource(resource: ResourceCreate, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"_id": payload["sub"]})
    if user["role"] not in ["admin", "emergency_provider"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    resource_dict = resource.dict()
    resource_dict["id"] = str(datetime.utcnow().timestamp())
    resource_dict["allocated"] = 0
    resource_dict["updated_at"] = datetime.utcnow()
    
    await db.resources.insert_one(resource_dict)
    return ResourceResponse(**resource_dict)

@router.post("/{resource_id}/allocate")
async def allocate_resource(resource_id: str, quantity: int, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    result = await allocation_service.allocate(resource_id, quantity)
    return result