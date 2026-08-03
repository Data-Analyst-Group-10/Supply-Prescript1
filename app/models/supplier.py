from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

from app.db.base import Base


class Supplier(Base):

    __tablename__ = "suppliers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    contact_person = Column(
        String,
        nullable=True
    )

    email = Column(
        String,
        unique=True,
        index=True,
        nullable=True
    )

    phone = Column(
        String,
        nullable=True
    )

    address = Column(
        String,
        nullable=True
    )

    rating = Column(
        Float,
        nullable=True
    )


    inventory_items = relationship(
        "InventoryItem",
        back_populates="supplier",
        cascade="all, delete-orphan"
    )