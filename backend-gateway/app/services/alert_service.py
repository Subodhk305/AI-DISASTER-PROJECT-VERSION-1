import asyncio
from datetime import datetime
from typing import List
import logging

from app.config import settings
from app.utils.database import db
from app.services.email_service import email_service
from app.utils.websocket_manager import manager

logger = logging.getLogger(__name__)

class AlertService:
    async def check_and_send_alerts(self):
        """Check for high-risk predictions and send alerts"""
        # This would check predictions for all users
        pass
    
    async def send_alert_to_user(self, user_id: str, message: str, severity: str, alert_type: str, location: str = None):
        alert = {
            "id": str(datetime.utcnow().timestamp()),
            "user_id": user_id,
            "message": message,
            "severity": severity,
            "type": alert_type,
            "location": location,
            "read": False,
            "created_at": datetime.utcnow(),
            "sent_at": datetime.utcnow()
        }
        
        # Save to database
        await db.alerts.insert_one(alert)
        
        # Send email
        user = await db.users.find_one({"_id": user_id})
        if user and user.get("email"):
            await email_service.send_alert_email(user["email"], message, severity, alert_type)
        
        # Send via WebSocket
        await manager.broadcast({
            "type": "alert",
            "message": message,
            "severity": severity,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return alert
    
    async def send_alert_to_all(self, message: str, severity: str, alert_type: str):
        users = await db.users.find({"is_active": True}).to_list(1000)
        for user in users:
            await self.send_alert_to_user(str(user["_id"]), message, severity, alert_type, None)
    
    async def background_alert_checker(self):
        """Background task to check for alerts"""
        while True:
            try:
                await self.check_and_send_alerts()
                await asyncio.sleep(60)  # Check every minute
            except Exception as e:
                logger.error(f"Alert checker error: {e}")
                await asyncio.sleep(60)

alert_service = AlertService()