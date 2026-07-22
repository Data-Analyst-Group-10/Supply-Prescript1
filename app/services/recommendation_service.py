from sqlalchemy.orm import Session

from app.models.recommendation import Recommendation as RecommendationModel
from app.schemas.recommendation import (
    RecommendationCreate,
    RecommendationUpdate
)


class RecommendationService:

    def __init__(self, db: Session):
        self.db = db


    def create_recommendation(
        self,
        recommendation: RecommendationCreate
    ):

        db_recommendation = RecommendationModel(
            product_id=recommendation.product_id,
            supplier_id=recommendation.supplier_id,
            recommended_quantity=recommendation.recommended_quantity,
            recommendation_reason=recommendation.recommendation_reason
        )

        self.db.add(db_recommendation)
        self.db.commit()
        self.db.refresh(db_recommendation)

        return db_recommendation



    def get_recommendations(self):

        return self.db.query(RecommendationModel).all()



    def get_recommendation(self, recommendation_id: int):

        return (
            self.db.query(RecommendationModel)
            .filter(RecommendationModel.id == recommendation_id)
            .first()
        )



    def update_recommendation(
        self,
        recommendation_id: int,
        recommendation: RecommendationUpdate
    ):

        db_recommendation = self.get_recommendation(recommendation_id)

        if db_recommendation:

            update_data = recommendation.dict(
                exclude_unset=True
            )

            for key, value in update_data.items():
                setattr(
                    db_recommendation,
                    key,
                    value
                )

            self.db.commit()
            self.db.refresh(db_recommendation)

        return db_recommendation



    def delete_recommendation(
        self,
        recommendation_id: int
    ):

        db_recommendation = self.get_recommendation(
            recommendation_id
        )

        if db_recommendation:

            self.db.delete(db_recommendation)
            self.db.commit()

        return db_recommendation