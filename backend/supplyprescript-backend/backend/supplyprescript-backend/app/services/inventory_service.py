from sqlalchemy.orm import Session
from app.models.inventory_item import InventoryItem
from app.schemas.inventory_item import InventoryItemCreate, InventoryItemUpdate

class InventoryService:
    def __init__(self, db: Session):
        self.db = db

    def get_inventory_item(self, item_id: int) -> InventoryItem:
        return self.db.query(InventoryItem).filter(InventoryItem.id == item_id).first()

    def get_inventory_items(self, skip: int = 0, limit: int = 100) -> list[InventoryItem]:
        return self.db.query(InventoryItem).offset(skip).limit(limit).all()

    def create_inventory_item(self, item: InventoryItemCreate) -> InventoryItem:
        db_item = InventoryItem(**item.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def update_inventory_item(self, item_id: int, item: InventoryItemUpdate) -> InventoryItem:
        db_item = self.get_inventory_item(item_id)
        if db_item:
            for key, value in item.dict(exclude_unset=True).items():
                setattr(db_item, key, value)
            self.db.commit()
            self.db.refresh(db_item)
        return db_item

    def delete_inventory_item(self, item_id: int) -> bool:
        db_item = self.get_inventory_item(item_id)
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return True
        return False