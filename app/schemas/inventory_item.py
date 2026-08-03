from pydantic import BaseModel
from typing import Optional


class InventoryItemBase(BaseModel):

    name: str
    description: Optional[str] = None
    quantity: int
    price: float
    supplier_id: int


class InventoryItemCreate(InventoryItemBase):
    pass


class InventoryItemUpdate(BaseModel):

    name: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[float] = None
    supplier_id: Optional[int] = None


class InventoryItemResponse(InventoryItemBase):

    id: int

    class Config:
        from_attributes = True