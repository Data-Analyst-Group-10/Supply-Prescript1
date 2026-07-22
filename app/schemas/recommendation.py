from pydantic import BaseModel


class RecommendationBase(BaseModel):
    product_id: int
    supplier_id: int
    recommended_quantity: float
    recommendation_reason: str


class RecommendationCreate(RecommendationBase):
    pass


class RecommendationUpdate(BaseModel):
    product_id: int | None = None
    supplier_id: int | None = None
    recommended_quantity: float | None = None
    recommendation_reason: str | None = None


class RecommendationResponse(RecommendationBase):
    id: int

    class Config:
        from_attributes = True