from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.supplier import SupplierCreate, SupplierUpdate, Supplier
from app.crud.supplier import create_supplier, get_supplier, update_supplier, delete_supplier, get_suppliers

router = APIRouter()

@router.post("/", response_model=Supplier)
def create_new_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    return create_supplier(db=db, supplier=supplier)

@router.get("/{supplier_id}", response_model=Supplier)
def read_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = get_supplier(db=db, supplier_id=supplier_id)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier

@router.put("/{supplier_id}", response_model=Supplier)
def update_existing_supplier(supplier_id: int, supplier: SupplierUpdate, db: Session = Depends(get_db)):
    db_supplier = update_supplier(db=db, supplier_id=supplier_id, supplier=supplier)
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier

@router.delete("/{supplier_id}", response_model=dict)
def delete_existing_supplier(supplier_id: int, db: Session = Depends(get_db)):
    result = delete_supplier(db=db, supplier_id=supplier_id)
    if not result:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return {"message": "Supplier deleted successfully"}

@router.get("/", response_model=list[Supplier])
def list_suppliers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    suppliers = get_suppliers(db=db, skip=skip, limit=limit)
    return suppliers