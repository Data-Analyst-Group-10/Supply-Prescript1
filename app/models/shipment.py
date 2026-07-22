from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import Base


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, nullable=True)
    tracking_number = Column(String, nullable=False)
    status = Column(String, default="pending")
    origin = Column(String, nullable=True)
    destination = Column(String, nullable=True)
    estimated_arrival = Column(DateTime, nullable=True)