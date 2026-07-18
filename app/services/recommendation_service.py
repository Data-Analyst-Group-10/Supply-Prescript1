from typing import List
from sqlalchemy.orm import Session
from app.models.recommendation import Recommendation
from app.schemas.recommendation import RecommendationCreate, RecommendationUpdate

class RecommendationService:
    def __init__(self, db: Session):
        self.db = db

    def create_recommendation(self, recommendation: RecommendationCreate) -> Recommendation:
        db_recommendation = Recommendation(**recommendation.dict())
        self.db.add(db_recommendation)
        self.db.commit()
        self.db.refresh(db_recommendation)
        return db_recommendation

    def get_recommendation(self, recommendation_id: int) -> Recommendation:
        return self.db.query(Recommendation).filter(Recommendation.id == recommendation_id).first()

    def get_recommendations(self) -> List[Recommendation]:
        return self.db.query(Recommendation).all()

    def update_recommendation(self, recommendation_id: int, recommendation: RecommendationUpdate) -> Recommendation:
        db_recommendation = self.get_recommendation(recommendation_id)
        if db_recommendation:
            for key, value in recommendation.dict(exclude_unset=True).items():
                setattr(db_recommendation, key, value)
            self.db.commit()
            self.db.refresh(db_recommendation)
        return db_recommendation

    def delete_recommendation(self, recommendation_id: int) -> None:
        db_recommendation = self.get_recommendation(recommendation_id)
        if db_recommendation:
            self.db.delete(db_recommendation)
            self.db.commit()