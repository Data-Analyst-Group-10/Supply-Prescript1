from sqlalchemy.orm import Session
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate

class CRUDOrder:
    def __init__(self, model: Order):
        self.model = model

    def create(self, db: Session, order: OrderCreate) -> Order:
        db_order = self.model(**order.dict())
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        return db_order

    def get(self, db: Session, order_id: int) -> Order:
        return db.query(self.model).filter(self.model.id == order_id).first()

    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> list[Order]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def update(self, db: Session, order_id: int, order: OrderUpdate) -> Order:
        db_order = self.get(db, order_id)
        if db_order:
            for key, value in order.dict(exclude_unset=True).items():
                setattr(db_order, key, value)
            db.commit()
            db.refresh(db_order)
        return db_order

    def delete(self, db: Session, order_id: int) -> Order:
        db_order = self.get(db, order_id)
        if db_order:
            db.delete(db_order)
            db.commit()
        return db_order

order_crud = CRUDOrder(Order)
def create_order(db: Session, order: OrderCreate):
    return order_crud.create(db, order)


def get_order(db: Session, order_id: int):
    return order_crud.get(db, order_id)


def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return order_crud.get_all(db, skip, limit)


def update_order(db: Session, order_id: int, order: OrderUpdate):
    return order_crud.update(db, order_id, order)


def delete_order(db: Session, order_id: int):
    return order_crud.delete(db, order_id)