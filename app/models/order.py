from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, nullable=True)

    product_id = Column(Integer, nullable=True)

    quantity = Column(Integer, nullable=False)

    status = Column(String, default="pending")

    order_date = Column(
        DateTime,
        server_default=func.now()
    )