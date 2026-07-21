from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.recommendation import Recommendation
from app.services.forecasting_service import ForecastingService

router = APIRouter()
forecasting_service = ForecastingService(
    "ml/model/xgboost_model.joblib"
)

@router.get("/analytics", response_model=List[Recommendation])
async def get_analytics():
    try:
        analytics_data = forecasting_service.get_analytics_data()
        return analytics_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))