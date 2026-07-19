from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    quantity = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    supplier_id = Column(Integer, nullable=False)  # Foreign key to suppliers table

    def __repr__(self):
        return f"<InventoryItem(id={self.id}, name={self.name}, quantity={self.quantity}, price={self.price})>"