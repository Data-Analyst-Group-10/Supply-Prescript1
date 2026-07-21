from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ShipmentBase(BaseModel):
    tracking_number: str
    status: str
    origin: str
    destination: str
    estimated_arrival: datetime

class ShipmentCreate(ShipmentBase):
    pass

class ShipmentUpdate(ShipmentBase):
    status: Optional[str] = None
    estimated_arrival: Optional[datetime] = None

class Shipment(ShipmentBase):
    id: int

    class Config:
        orm_mode = True