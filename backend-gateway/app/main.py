# backend-gateway/app/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
import aiohttp
import asyncio
import jwt
import bcrypt
import uuid
import logging

from app.config import settings

app = FastAPI(title="AI Unified Disaster System", version="1.0.0")
security = HTTPBearer()
logger = logging.getLogger(__name__)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use settings from config.py
EARTHQUAKE_API_URL = settings.EARTHQUAKE_API_URL
RAINFALL_API_URL = settings.RAINFALL_API_URL
FLOOD_API_URL = settings.FLOOD_API_URL

# Mock database
users_db = {}
alerts_db = []
resources_db = [
    {"id": "1", "name": "Tents", "quantity": 150, "threshold": 50, "region": "Mumbai", "allocated": 30},
    {"id": "2", "name": "Food Packages", "quantity": 500, "threshold": 200, "region": "Mumbai", "allocated": 100},
    {"id": "3", "name": "Medical Kits", "quantity": 75, "threshold": 30, "region": "Delhi", "allocated": 20},
    {"id": "4", "name": "Water Bottles", "quantity": 1000, "threshold": 300, "region": "Delhi", "allocated": 250},
]
volunteers_db = [
    {"id": "1", "name": "John Doe", "email": "john@example.com", "phone": "+91 98765 43210", "location": "Mumbai", "skills": ["First Aid", "Rescue"], "status": "available"},
    {"id": "2", "name": "Jane Smith", "email": "jane@example.com", "phone": "+91 98765 43211", "location": "Delhi", "skills": ["Logistics", "Communication"], "status": "available"},
]

# ==================== Pydantic Models ====================

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str = "user"
    phone: Optional[str] = None
    location: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class PredictionRequest(BaseModel):
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
    error: Optional[str] = None

class RainfallPrediction(BaseModel):
    status: str
    rainfall_mm: float
    risk_probability: float
    risk_level: str
    confidence: Optional[float] = None
    timestamp: Optional[str] = None

class FloodPrediction(BaseModel):
    status: str
    risk_probability: float
    risk_level: str
    severity: Optional[str] = None
    confidence: Optional[float] = None
    timestamp: Optional[str] = None

class PredictionResponse(BaseModel):
    earthquake: EarthquakePrediction
    rainfall: RainfallPrediction
    flood: FloodPrediction
    overall_risk: float
    location: str
    lat: float
    lng: float

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
    created_at: str

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

class VolunteerCreate(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    skills: List[str] = []

class VolunteerResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    location: str
    skills: List[str]
    status: str

# ==================== Helper Functions ====================

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None

# ==================== Auth Endpoints ====================

@app.post("/api/auth/register", response_model=TokenResponse)
async def register(user_data: RegisterRequest):
    if user_data.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(user_data.password.encode(), salt).decode()
    
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "password_hash": password_hash,
        "role": user_data.role,
        "phone": user_data.phone,
        "location": user_data.location,
        "created_at": datetime.utcnow().isoformat()
    }
    users_db[user_data.email] = user
    
    access_token = create_access_token(data={"sub": user_id, "role": user_data.role})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user_id,
            name=user_data.name,
            email=user_data.email,
            role=user_data.role
        )
    )

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    if credentials.email == "admin@disaster.com" and credentials.password == "admin123":
        user = {"id": "1", "name": "Admin User", "email": "admin@disaster.com", "role": "admin"}
        access_token = create_access_token(data={"sub": user["id"], "role": user["role"]})
        return TokenResponse(access_token=access_token, token_type="bearer", user=UserResponse(**user))
    
    if credentials.email == "user@example.com" and credentials.password == "user123":
        user = {"id": "2", "name": "Test User", "email": "user@example.com", "role": "user"}
        access_token = create_access_token(data={"sub": user["id"], "role": user["role"]})
        return TokenResponse(access_token=access_token, token_type="bearer", user=UserResponse(**user))
    
    user = users_db.get(credentials.email)
    if user and bcrypt.checkpw(credentials.password.encode(), user["password_hash"].encode()):
        access_token = create_access_token(data={"sub": user["id"], "role": user["role"]})
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=user["id"],
                name=user["name"],
                email=user["email"],
                role=user["role"]
            )
        )
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    for user in users_db.values():
        if user["id"] == payload["sub"]:
            return UserResponse(
                id=user["id"],
                name=user["name"],
                email=user["email"],
                role=user["role"]
            )
    
    if payload["sub"] == "1":
        return UserResponse(id="1", name="Admin User", email="admin@disaster.com", role="admin")
    if payload["sub"] == "2":
        return UserResponse(id="2", name="Test User", email="user@example.com", role="user")
    
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/api/auth/logout")
async def logout():
    return {"message": "Logged out successfully"}

# ==================== Prediction Endpoints ====================

async def get_earthquake_prediction(lat: float, lng: float, location: str) -> EarthquakePrediction:
    """Fetch real prediction from earthquake model on your laptop (port 8000)"""
    try:
        logger.info(f"📡 Calling Earthquake API at {EARTHQUAKE_API_URL}")
        async with aiohttp.ClientSession() as session:
            payload = {
                "latitude": lat,
                "longitude": lng,
                "location_name": location,
                "radius_km": 200,
                "include_waveform": False
            }
            async with session.post(
                f"{EARTHQUAKE_API_URL}/api/v1/predict",
                json=payload,
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    logger.info(f"✅ Earthquake API response: probability={data.get('probability', 0)}")
                    return EarthquakePrediction(
                        status="success",
                        risk_probability=data.get("probability", 0),
                        risk_level=data.get("risk_level", "Low"),
                        magnitude_class=data.get("predicted_magnitude_class", "unknown"),
                        confidence=data.get("confidence", 0),
                        timestamp=datetime.now().isoformat()
                    )
                else:
                    logger.error(f"❌ Earthquake API error: {response.status}")
                    return EarthquakePrediction(
                        status="error",
                        risk_probability=0,
                        risk_level="Unknown",
                        error=f"HTTP {response.status}"
                    )
    except Exception as e:
        logger.error(f"❌ Earthquake prediction error: {e}")
        return EarthquakePrediction(
            status="error",
            risk_probability=0,
            risk_level="Unknown",
            error=str(e)
        )

async def get_rainfall_prediction(lat: float, lng: float, location: str) -> RainfallPrediction:
    """Fetch real prediction from rainfall model on teammate's laptop"""
    try:
        # CORRECT ENDPOINT: /api/v1/predict (based on the API documentation)
        url = f"{RAINFALL_API_URL}/api/v1/predict"
        logger.info(f"📡 Calling Rainfall API at {url}")
        
        async with aiohttp.ClientSession() as session:
            # Correct payload format from the documentation
            payload = {
                "latitude": lat,
                "longitude": lng,
                "location_name": location,
                "forecast_days": 7
            }
            logger.info(f"📤 Rainfall payload: {payload}")
            
            async with session.post(
                url,
                json=payload,
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    logger.info(f"✅ Rainfall API response: {data}")
                    
                    # Extract rainfall data
                    rainfall_mm = data.get("rainfall_mm") or data.get("rainfall") or data.get("precipitation") or 0
                    probability = data.get("probability") or data.get("risk_probability") or min(100, rainfall_mm * 2)
                    risk_level = data.get("risk_level") or ("High" if rainfall_mm > 40 else "Medium" if rainfall_mm > 20 else "Low")
                    confidence = data.get("confidence") or 0.85
                    
                    return RainfallPrediction(
                        status="success",
                        rainfall_mm=float(rainfall_mm),
                        risk_probability=float(probability),
                        risk_level=risk_level,
                        confidence=float(confidence),
                        timestamp=datetime.now().isoformat()
                    )
                else:
                    logger.error(f"❌ Rainfall API error: HTTP {response.status}")
                    return RainfallPrediction(
                        status="error",
                        rainfall_mm=0,
                        risk_probability=0,
                        risk_level="Unknown",
                        error=f"HTTP {response.status}"
                    )
    except asyncio.TimeoutError:
        logger.error(f"❌ Rainfall API timeout")
        return RainfallPrediction(
            status="error",
            rainfall_mm=0,
            risk_probability=0,
            risk_level="Unknown",
            error="Timeout"
        )
    except aiohttp.ClientConnectorError as e:
        logger.error(f"❌ Cannot connect to Rainfall API: {e}")
        return RainfallPrediction(
            status="error",
            rainfall_mm=0,
            risk_probability=0,
            risk_level="Unknown",
            error=f"Cannot connect: {e}"
        )
    except Exception as e:
        logger.error(f"❌ Rainfall prediction error: {e}")
        return RainfallPrediction(
            status="error",
            rainfall_mm=0,
            risk_probability=0,
            risk_level="Unknown",
            error=str(e)
        )

async def get_flood_prediction(lat: float, lng: float, location: str) -> FloodPrediction:
    """Fetch real prediction from flood model on teammate's laptop"""
    try:
        # Try multiple endpoints for flood model
        endpoints_to_try = [
            "/api/v1/predict",  # Try this first (if it follows same pattern)
            "/predict",         # Based on logs, this works (200 OK)
            "/api/predict",
            "/flood/predict"
        ]
        
        async with aiohttp.ClientSession() as session:
            payload = {
                "latitude": lat,
                "longitude": lng,
                "location_name": location
            }
            logger.info(f"📤 Flood payload: {payload}")
            
            for endpoint in endpoints_to_try:
                url = f"{FLOOD_API_URL}{endpoint}"
                logger.info(f"📡 Trying Flood endpoint: {url}")
                
                try:
                    async with session.post(
                        url,
                        json=payload,
                        timeout=aiohttp.ClientTimeout(total=10)
                    ) as response:
                        if response.status == 200:
                            data = await response.json()
                            logger.info(f"✅ Flood API response from {endpoint}: {data}")
                            
                            probability = data.get("probability") or data.get("risk_probability") or 0
                            risk_level = data.get("risk_level") or ("High" if probability > 0.6 else "Medium" if probability > 0.3 else "Low")
                            severity = data.get("severity") or risk_level
                            confidence = data.get("confidence") or 0.82
                            
                            return FloodPrediction(
                                status="success",
                                risk_probability=float(probability),
                                risk_level=risk_level,
                                severity=severity,
                                confidence=float(confidence),
                                timestamp=datetime.now().isoformat()
                            )
                        else:
                            logger.warning(f"⚠️ Flood endpoint {endpoint} returned {response.status}")
                except asyncio.TimeoutError:
                    logger.warning(f"⚠️ Flood endpoint {endpoint} timeout")
                except Exception as e:
                    logger.warning(f"⚠️ Flood endpoint {endpoint} error: {e}")
            
            logger.error(f"❌ All Flood endpoints failed")
            return FloodPrediction(
                status="error",
                risk_probability=0,
                risk_level="Unknown",
                severity="Unknown",
                confidence=0,
                error="All endpoints failed"
            )
    except Exception as e:
        logger.error(f"❌ Flood prediction error: {e}")
        return FloodPrediction(
            status="error",
            risk_probability=0,
            risk_level="Unknown",
            error=str(e)
        )

@app.post("/api/predictions/unified", response_model=PredictionResponse)
async def get_unified_predictions(request: PredictionRequest):
    """Get predictions from all three models running on different laptops"""
    try:
        logger.info(f"📍 Received prediction request for {request.location} at ({request.lat}, {request.lng})")
        
        # Run all predictions in parallel
        earthquake_task = get_earthquake_prediction(request.lat, request.lng, request.location)
        rainfall_task = get_rainfall_prediction(request.lat, request.lng, request.location)
        flood_task = get_flood_prediction(request.lat, request.lng, request.location)
        
        earthquake, rainfall, flood = await asyncio.gather(
            earthquake_task, rainfall_task, flood_task
        )
        
        # Calculate overall risk (weighted average)
        overall_risk = (
            earthquake.risk_probability * 0.4 +
            (rainfall.risk_probability / 100) * 0.3 +
            flood.risk_probability * 0.3
        )
        
        logger.info(f"📊 Prediction Summary:")
        logger.info(f"   🌋 Earthquake: {earthquake.risk_probability*100:.1f}% ({earthquake.status})")
        logger.info(f"   🌧️ Rainfall: {rainfall.rainfall_mm}mm ({rainfall.status})")
        logger.info(f"   🌊 Flood: {flood.risk_probability*100:.1f}% ({flood.status})")
        
        return PredictionResponse(
            earthquake=earthquake,
            rainfall=rainfall,
            flood=flood,
            overall_risk=overall_risk,
            location=request.location,
            lat=request.lat,
            lng=request.lng
        )
    except Exception as e:
        logger.error(f"❌ Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== Alerts Endpoints ====================

@app.get("/api/alerts", response_model=List[AlertResponse])
async def get_alerts(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return [AlertResponse(**alert) for alert in alerts_db]

@app.get("/api/alerts/user", response_model=List[AlertResponse])
async def get_user_alerts(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_alerts = [a for a in alerts_db if a.get("user_id") == payload["sub"]]
    return [AlertResponse(**alert) for alert in user_alerts]

@app.put("/api/alerts/{alert_id}/read")
async def mark_alert_read(alert_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    for alert in alerts_db:
        if alert.get("id") == alert_id:
            alert["read"] = True
            return {"message": "Alert marked as read"}
    raise HTTPException(status_code=404, detail="Alert not found")

@app.post("/api/alerts/manual")
async def create_manual_alert(alert: AlertCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    new_alert = {
        "id": str(uuid.uuid4()),
        "message": alert.message,
        "severity": alert.severity,
        "type": alert.type,
        "read": False,
        "created_at": datetime.now().isoformat(),
        "user_id": payload["sub"]
    }
    alerts_db.append(new_alert)
    return {"message": "Alert sent successfully"}

# ==================== Resources Endpoints ====================

@app.get("/api/resources", response_model=List[ResourceResponse])
async def get_resources(region: Optional[str] = None, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    if region:
        filtered = [r for r in resources_db if r["region"].lower() == region.lower()]
        return [ResourceResponse(**r) for r in filtered]
    return [ResourceResponse(**r) for r in resources_db]

@app.post("/api/resources", response_model=ResourceResponse)
async def create_resource(resource: ResourceCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    new_resource = {
        "id": str(len(resources_db) + 1),
        "name": resource.name,
        "quantity": resource.quantity,
        "threshold": resource.threshold,
        "region": resource.region,
        "allocated": 0
    }
    resources_db.append(new_resource)
    return ResourceResponse(**new_resource)

@app.post("/api/resources/{resource_id}/allocate")
async def allocate_resource(resource_id: str, quantity: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    for resource in resources_db:
        if resource["id"] == resource_id:
            if resource["quantity"] - resource["allocated"] < quantity:
                raise HTTPException(status_code=400, detail="Insufficient resources")
            resource["allocated"] += quantity
            return {"message": f"Allocated {quantity} units", "remaining": resource["quantity"] - resource["allocated"]}
    raise HTTPException(status_code=404, detail="Resource not found")

# ==================== Volunteers Endpoints ====================

@app.get("/api/volunteers", response_model=List[VolunteerResponse])
async def get_volunteers(location: Optional[str] = None, status: Optional[str] = None, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    result = volunteers_db
    if location:
        result = [v for v in result if location.lower() in v["location"].lower()]
    if status:
        result = [v for v in result if v["status"] == status]
    return [VolunteerResponse(**v) for v in result]

@app.post("/api/volunteers/register", response_model=VolunteerResponse)
async def register_volunteer(volunteer: VolunteerCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    new_volunteer = {
        "id": str(len(volunteers_db) + 1),
        "name": volunteer.name,
        "email": volunteer.email,
        "phone": volunteer.phone,
        "location": volunteer.location,
        "skills": volunteer.skills,
        "status": "available"
    }
    volunteers_db.append(new_volunteer)
    return VolunteerResponse(**new_volunteer)

@app.post("/api/volunteers/{volunteer_id}/assign")
async def assign_volunteer(volunteer_id: str, task: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    for volunteer in volunteers_db:
        if volunteer["id"] == volunteer_id and volunteer["status"] == "available":
            volunteer["status"] = "assigned"
            volunteer["assigned_task"] = task
            return {"message": f"Volunteer assigned to task: {task}"}
    raise HTTPException(status_code=404, detail="Volunteer not available")

# ==================== Health Check ====================

@app.get("/api/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/")
async def root():
    return {
        "service": "AI Unified Disaster Prediction System",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": ["/api/auth", "/api/predictions", "/api/alerts", "/api/resources", "/api/volunteers"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)