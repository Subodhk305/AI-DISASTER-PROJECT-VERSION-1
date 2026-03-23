from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
import aiohttp
import asyncio

from app.config import settings
from app.schemas.schemas import UnifiedPredictionRequest, UnifiedPredictionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/unified", response_model=UnifiedPredictionResponse)
async def get_unified_predictions(request: UnifiedPredictionRequest):
    """
    Get predictions from all three AI models
    """
    try:
        # Run all predictions in parallel
        earthquake_task = prediction_service.get_earthquake_prediction(request.lat, request.lng, request.location)
        rainfall_task = prediction_service.get_rainfall_prediction(request.lat, request.lng, request.location)
        flood_task = prediction_service.get_flood_prediction(request.lat, request.lng, request.location)
        
        earthquake, rainfall, flood = await asyncio.gather(
            earthquake_task, rainfall_task, flood_task
        )
        
        # Calculate overall risk
        overall_risk = (
            earthquake.get("risk_probability", 0) * 0.4 +
            (rainfall.get("risk_probability", 0) / 100) * 0.3 +
            flood.get("risk_probability", 0) * 0.3
        )
        
        return UnifiedPredictionResponse(
            earthquake=earthquake,
            rainfall=rainfall,
            flood=flood,
            overall_risk=overall_risk,
            location=request.location,
            lat=request.lat,
            lng=request.lng
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))