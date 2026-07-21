from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate, Shipment
from app.crud.shipment import create_shipment, get_shipments, update_shipment, get_shipment

router = APIRouter()

@router.post("/", response_model=Shipment)
async def create_new_shipment(shipment: ShipmentCreate):
    return await create_shipment(shipment)

@router.get("/", response_model=List[Shipment])
async def read_shipments(skip: int = 0, limit: int = 10):
    return await get_shipments(skip=skip, limit=limit)

@router.get("/{shipment_id}", response_model=Shipment)
async def read_shipment(shipment_id: int):
    shipment = await get_shipment(shipment_id)
    if shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment

@router.put("/{shipment_id}", response_model=Shipment)
async def update_existing_shipment(shipment_id: int, shipment: ShipmentUpdate):
    updated_shipment = await update_shipment(shipment_id, shipment)
    if updated_shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return updated_shipment