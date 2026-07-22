from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.recommendation import RecommendationResponse
from app.services.forecasting_service import ForecastingService


router = APIRouter()

forecasting_service = ForecastingService(
    "ml/model/xgboost_model.joblib"
)


@router.get("/analytics", response_model=List[RecommendationResponse])
async def get_analytics():
    try:
        # Later we will connect ML prediction here
        return []

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )