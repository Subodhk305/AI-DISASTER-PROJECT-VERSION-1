import aiohttp
import asyncio
from typing import Dict, Any
import logging

from app.config import settings

logger = logging.getLogger(__name__)

class PredictionService:
    def __init__(self):
        self.earthquake_url = settings.EARTHQUAKE_API_URL
        self.rainfall_url = settings.RAINFALL_API_URL
        self.flood_url = settings.FLOOD_API_URL
    
    async def get_earthquake_prediction(self, lat: float, lng: float, location: str) -> Dict:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.earthquake_url}/predict",
                    json={"latitude": lat, "longitude": lng, "location_name": location},
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    data = await response.json()
                    return {
                        "status": "success",
                        "risk_probability": data.get("probability", 0),
                        "risk_level": data.get("risk_level", "Low"),
                        "magnitude_class": data.get("predicted_magnitude_class", "unknown"),
                        "confidence": data.get("confidence", 0),
                        "timestamp": data.get("timestamp")
                    }
        except Exception as e:
            logger.error(f"Earthquake prediction error: {e}")
            return {"status": "error", "risk_probability": 0, "risk_level": "Unknown", "error": str(e)}
    
    async def get_rainfall_prediction(self, lat: float, lng: float, location: str) -> Dict:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.rainfall_url}/predict",
                    json={"lat": lat, "lng": lng, "location": location},
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    data = await response.json()
                    rainfall_mm = data.get("rainfall_mm", 0)
                    return {
                        "status": "success",
                        "rainfall_mm": rainfall_mm,
                        "risk_probability": min(100, rainfall_mm / 5),
                        "risk_level": "High" if rainfall_mm > 50 else "Medium" if rainfall_mm > 20 else "Low",
                        "confidence": data.get("confidence", 0.8),
                        "timestamp": data.get("timestamp")
                    }
        except Exception as e:
            logger.error(f"Rainfall prediction error: {e}")
            return {"status": "error", "rainfall_mm": 0, "risk_probability": 0, "risk_level": "Unknown"}
    
    async def get_flood_prediction(self, lat: float, lng: float, location: str) -> Dict:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.flood_url}/predict",
                    json={"latitude": lat, "longitude": lng, "location": location},
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    data = await response.json()
                    return {
                        "status": "success",
                        "risk_probability": data.get("probability", 0),
                        "risk_level": data.get("risk_level", "Low"),
                        "severity": data.get("severity", "Low"),
                        "confidence": data.get("confidence", 0),
                        "timestamp": data.get("timestamp")
                    }
        except Exception as e:
            logger.error(f"Flood prediction error: {e}")
            return {"status": "error", "risk_probability": 0, "risk_level": "Unknown"}

prediction_service = PredictionService()