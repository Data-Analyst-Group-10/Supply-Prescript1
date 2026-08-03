from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base


class InventoryItem(Base):

    __tablename__ = "inventory_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    price = Column(
        Float,
        nullable=False
    )

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id"),
        nullable=False
    )


    supplier = relationship(
        "Supplier",
        back_populates="inventory_items"
    )