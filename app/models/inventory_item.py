from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    quantity = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=False)

    supplier = relationship("Supplier", back_populates="inventory_items")

    def __repr__(self):
        return f"<InventoryItem(id={self.id}, name={self.name}, quantity={self.quantity}, price={self.price})>"