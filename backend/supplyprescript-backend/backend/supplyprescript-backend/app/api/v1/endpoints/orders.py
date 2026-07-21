from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.order import OrderCreate, Order, OrderUpdate
from app.crud.order import create_order, get_order, get_orders, update_order, delete_order

router = APIRouter()

@router.post("/", response_model=Order)
async def create_new_order(order: OrderCreate):
    db_order = create_order(order)
    if not db_order:
        raise HTTPException(status_code=400, detail="Order could not be created")
    return db_order

@router.get("/{order_id}", response_model=Order)
async def read_order(order_id: int):
    db_order = get_order(order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.get("/", response_model=List[Order])
async def read_orders(skip: int = 0, limit: int = 10):
    orders = get_orders(skip=skip, limit=limit)
    return orders

@router.put("/{order_id}", response_model=Order)
async def update_existing_order(order_id: int, order: OrderUpdate):
    db_order = update_order(order_id, order)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.delete("/{order_id}", response_model=dict)
async def delete_existing_order(order_id: int):
    result = delete_order(order_id)
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"detail": "Order deleted successfully"}