from pydantic import BaseModel
from typing import List


class RecommendationBase(BaseModel):
    item_id: int
    predicted_demand: float
    recommended_action: str


class RecommendationCreate(RecommendationBase):
    pass


class RecommendationUpdate(RecommendationBase):
    pass


class Recommendation(RecommendationBase):
    id: int

    class Config:
        orm_mode = True


class RecommendationResponse(RecommendationBase):
    id: int

    class Config:
        orm_mode = True


class RecommendationList(BaseModel):
    recommendations: List[Recommendation]