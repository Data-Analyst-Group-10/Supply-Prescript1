from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ShipmentBase(BaseModel):
    tracking_number: str
    status: str
    origin: Optional[str] = None
    destination: Optional[str] = None
    estimated_arrival: Optional[datetime] = None


class ShipmentCreate(ShipmentBase):
    pass


class ShipmentUpdate(BaseModel):
    status: Optional[str] = None
    origin: Optional[str] = None
    destination: Optional[str] = None
    estimated_arrival: Optional[datetime] = None


class Shipment(ShipmentBase):
    id: int

    class Config:
        from_attributes = True