from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate

class CRUDSupplier:
    def get(self, db: Session, supplier_id: int):
        return db.query(Supplier).filter(Supplier.id == supplier_id).first()

    def get_all(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(Supplier).offset(skip).limit(limit).all()

    def create(self, db: Session, supplier: SupplierCreate):
        db_supplier = Supplier(**supplier.dict())
        db.add(db_supplier)
        db.commit()
        db.refresh(db_supplier)
        return db_supplier

    def update(self, db: Session, supplier_id: int, supplier: SupplierUpdate):
        db_supplier = self.get(db, supplier_id)
        if db_supplier:
            for key, value in supplier.dict(exclude_unset=True).items():
                setattr(db_supplier, key, value)
            db.commit()
            db.refresh(db_supplier)
        return db_supplier

    def delete(self, db: Session, supplier_id: int):
        db_supplier = self.get(db, supplier_id)
        if db_supplier:
            db.delete(db_supplier)
            db.commit()
        return db_supplier

crud_supplier = CRUDSupplier()
def create_supplier(db: Session, supplier: SupplierCreate):
    return crud_supplier.create(db, supplier)


def get_supplier(db: Session, supplier_id: int):
    return crud_supplier.get(db, supplier_id)


def get_suppliers(db: Session, skip: int = 0, limit: int = 100):
    return crud_supplier.get_all(db, skip, limit)


def update_supplier(db: Session, supplier_id: int, supplier: SupplierUpdate):
    return crud_supplier.update(db, supplier_id, supplier)


def delete_supplier(db: Session, supplier_id: int):
    return crud_supplier.delete(db, supplier_id)