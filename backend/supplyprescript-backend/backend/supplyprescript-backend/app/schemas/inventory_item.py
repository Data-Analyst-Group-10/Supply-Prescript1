from pydantic import BaseModel
from typing import Optional

class InventoryItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    quantity: int
    price: float

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(InventoryItemBase):
    pass

class InventoryItem(InventoryItemBase):
    id: int

    class Config:
        orm_mode = True