from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, index=True)
    supplier_id = Column(Integer, index=True)
    recommended_quantity = Column(Float)
    recommendation_reason = Column(String)