from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Shipment(Base):
    __tablename__ = 'shipments'

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, index=True)
    tracking_number = Column(String, unique=True, index=True)
    status = Column(String, index=True)
    shipped_date = Column(DateTime)
    delivery_date = Column(DateTime)
    carrier = Column(String)
    weight = Column(Float)
    dimensions = Column(String)  # e.g., "10x10x10" for cubic dimensions
    destination = Column(String)  # e.g., "New York, NY"