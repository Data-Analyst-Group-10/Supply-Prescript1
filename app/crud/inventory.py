from sqlalchemy.orm import Session
from app.models.inventory_item import InventoryItem
from app.schemas.inventory_item import InventoryItemCreate, InventoryItemUpdate

def get_inventory_item(db: Session, item_id: int):
    return db.query(InventoryItem).filter(InventoryItem.id == item_id).first()

def get_inventory_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(InventoryItem).offset(skip).limit(limit).all()

def create_inventory_item(db: Session, item: InventoryItemCreate):
    db_item = InventoryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_inventory_item(db: Session, item_id: int, item: InventoryItemUpdate):
    db_item = get_inventory_item(db, item_id)
    if db_item:
        for key, value in item.dict(exclude_unset=True).items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_inventory_item(db: Session, item_id: int):
    db_item = get_inventory_item(db, item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item
class InventoryCRUD:
    def get(self, db: Session, item_id: int):
        return get_inventory_item(db, item_id)

    def create(self, db: Session, item: InventoryItemCreate):
        return create_inventory_item(db, item)

    def update(self, db: Session, item_id: int, item: InventoryItemUpdate):
        return update_inventory_item(db, item_id, item)

    def delete(self, db: Session, item_id: int):
        return delete_inventory_item(db, item_id)


inventory_crud = InventoryCRUD()