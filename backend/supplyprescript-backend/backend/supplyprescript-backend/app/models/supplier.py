from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.db.base import Base

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact_person = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    rating = Column(Float)

    # Relationships
    inventory_items = relationship("InventoryItem", back_populates="supplier")
    orders = relationship("Order", back_populates="supplier")