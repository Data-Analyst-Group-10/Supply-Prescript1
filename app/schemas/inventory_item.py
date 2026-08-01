from pydantic import BaseModel
from typing import Optional


class InventoryItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    quantity: int
    price: float
    supplier_id: int


class InventoryCreate(InventoryItemBase):
    pass


class InventoryUpdate(InventoryItemBase):
    pass


class InventoryItem(InventoryItemBase):
    id: int

    class Config:
        from_attributes = True