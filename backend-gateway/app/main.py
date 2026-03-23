from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import logging
import asyncio
from datetime import datetime

from app.config import settings
from app.routes import auth, predictions, alerts, resources, volunteers
from app.utils.websocket_manager import manager
from app.services.alert_service import alert_service
from app.services.email_service import email_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting AI Unified Disaster System...")
    await email_service.initialize()
    asyncio.create_task(alert_service.background_alert_checker())
    yield
    # Shutdown
    logger.info("🛑 Shutting down...")

app = FastAPI(
    title="AI Unified Disaster Prediction and Response System",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])
app.include_router(volunteers.router, prefix="/api/volunteers", tags=["Volunteers"])

@app.get("/")
async def root():
    return {
        "service": "AI Unified Disaster Prediction System",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": ["/api/auth", "/api/predictions", "/api/alerts", "/api/resources", "/api/volunteers"]
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = None):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.handle_message(data, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)