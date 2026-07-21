from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderBase(BaseModel):
    product_id: int
    quantity: int
    order_date: datetime
    customer_id: int

class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    pass

class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True

class OrderList(BaseModel):
    orders: List[Order]