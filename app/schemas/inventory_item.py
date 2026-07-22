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


class InventoryItemUpdate(InventoryItemBase):
    pass


class InventoryItem(InventoryItemBase):
    id: int

    class Config:
        from_attributes = True