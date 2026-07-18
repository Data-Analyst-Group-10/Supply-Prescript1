from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.inventory_item import InventoryItemCreate, InventoryItemUpdate, InventoryItem
from app.crud.inventory import inventory_crud

router = APIRouter()

@router.post("/", response_model=InventoryItem)
def create_inventory_item(item: InventoryItemCreate, db: Session = Depends(get_db)):
    db_item = inventory_crud.create(db=db, item=item)
    return db_item

@router.get("/{item_id}", response_model=InventoryItem)
def read_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = inventory_crud.get(db=db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.put("/{item_id}", response_model=InventoryItem)
def update_inventory_item(item_id: int, item: InventoryItemUpdate, db: Session = Depends(get_db)):
    db_item = inventory_crud.update(db=db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.delete("/{item_id}", response_model=InventoryItem)
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = inventory_crud.delete(db=db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item