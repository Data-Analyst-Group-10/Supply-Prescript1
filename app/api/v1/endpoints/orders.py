from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.order import OrderCreate, Order, OrderUpdate
from app.crud.order import create_order, get_order, get_orders, update_order, delete_order

router = APIRouter()

@router.post("/", response_model=Order)
def create_new_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = create_order(db=db, order=order)
    if not db_order:
        raise HTTPException(status_code=400, detail="Order could not be created")
    return db_order

@router.get("/{order_id}", response_model=Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    db_order = get_order(db=db, order_id=order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.get("/", response_model=List[Order])
def read_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    orders = get_orders(db=db, skip=skip, limit=limit)
    return orders

@router.put("/{order_id}", response_model=Order)
def update_existing_order(order_id: int, order: OrderUpdate, db: Session = Depends(get_db)):
    db_order = update_order(db=db, order_id=order_id, order=order)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.delete("/{order_id}", response_model=dict)
def delete_existing_order(order_id: int, db: Session = Depends(get_db)):
    result = delete_order(db=db, order_id=order_id)
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"detail": "Order deleted successfully"}