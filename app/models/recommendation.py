from sqlalchemy import Column, Integer, Float, String
from app.db.base import Base


class Recommendation(Base):

    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(Integer, nullable=False)

    supplier_id = Column(Integer, nullable=False)

    recommended_quantity = Column(Float, nullable=False)

    recommendation_reason = Column(String, nullable=False)