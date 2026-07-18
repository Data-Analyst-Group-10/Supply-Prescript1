from pydantic import BaseModel
from typing import List, Optional

class SupplierBase(BaseModel):
    name: str
    contact_person: str
    email: str
    phone: str
    address: str

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(SupplierBase):
    pass

class Supplier(SupplierBase):
    id: int

    class Config:
        orm_mode = True

class SupplierList(BaseModel):
    suppliers: List[Supplier]