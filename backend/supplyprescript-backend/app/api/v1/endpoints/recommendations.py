from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.recommendation import RecommendationCreate, RecommendationResponse, RecommendationUpdate
from app.services.recommendation_service import RecommendationService

router = APIRouter()


@router.post("/", response_model=RecommendationResponse)
def create_recommendation(
    recommendation: RecommendationCreate,
    db: Session = Depends(get_db)
):
    service = RecommendationService(db)
    return service.create_recommendation(recommendation)


@router.get("/", response_model=list[RecommendationResponse])
def get_recommendations(
    db: Session = Depends(get_db)
):
    service = RecommendationService(db)
    return service.get_recommendations()


@router.get("/{recommendation_id}", response_model=RecommendationResponse)
def get_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db)
):
    service = RecommendationService(db)
    result = service.get_recommendation(recommendation_id)

    if not result:
        raise HTTPException(status_code=404, detail="Recommendation not found")

    return result


@router.put("/{recommendation_id}", response_model=RecommendationResponse)
def update_recommendation(
    recommendation_id: int,
    recommendation: RecommendationUpdate,
    db: Session = Depends(get_db)
):
    service = RecommendationService(db)
    return service.update_recommendation(
        recommendation_id,
        recommendation
    )


@router.delete("/{recommendation_id}")
def delete_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db)
):
    service = RecommendationService(db)
    service.delete_recommendation(recommendation_id)

    return {"message": "Recommendation deleted"}