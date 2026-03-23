from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime

from app.schemas.schemas import AlertCreate, AlertResponse
from app.services.alert_service import alert_service
from app.utils.database import db
from app.routes.auth import verify_token, security

router = APIRouter()

@router.get("/", response_model=List[AlertResponse])
async def get_all_alerts(credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    alerts = await db.alerts.find({"user_id": payload["sub"]}).sort("created_at", -1).to_list(100)
    return [AlertResponse(**alert) for alert in alerts]

@router.get("/user", response_model=List[AlertResponse])
async def get_user_alerts(credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    alerts = await db.alerts.find({"user_id": payload["sub"], "read": False}).sort("created_at", -1).to_list(50)
    return [AlertResponse(**alert) for alert in alerts]

@router.put("/{alert_id}/read")
async def mark_alert_read(alert_id: str, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    result = await db.alerts.update_one(
        {"id": alert_id, "user_id": payload["sub"]},
        {"$set": {"read": True, "read_at": datetime.utcnow()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    return {"message": "Alert marked as read"}

@router.post("/manual")
async def create_manual_alert(alert: AlertCreate, credentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"_id": payload["sub"]})
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await alert_service.send_alert_to_all(alert.message, alert.severity, alert.type)
    
    return {"message": "Alert sent successfully"}