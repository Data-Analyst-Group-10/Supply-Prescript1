from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate, Shipment
from app.crud.shipment import (
    create_shipment,
    get_shipments,
    get_shipment,
    update_shipment,
    delete_shipment,
)

router = APIRouter()


@router.post("/", response_model=Shipment)
def create_new_shipment(
    shipment: ShipmentCreate,
    db: Session = Depends(get_db)
):
    return create_shipment(db=db, shipment=shipment)


@router.get("/", response_model=List[Shipment])
def read_shipments(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return get_shipments(db=db, skip=skip, limit=limit)


@router.get("/{shipment_id}", response_model=Shipment)
def read_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    shipment = get_shipment(db=db, shipment_id=shipment_id)
    if shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment


@router.put("/{shipment_id}", response_model=Shipment)
def update_existing_shipment(
    shipment_id: int,
    shipment: ShipmentUpdate,
    db: Session = Depends(get_db)
):
    updated_shipment = update_shipment(
        db=db,
        shipment_id=shipment_id,
        shipment=shipment,
    )
    if updated_shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return updated_shipment


@router.delete("/{shipment_id}", response_model=Shipment)
def delete_existing_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    deleted_shipment = delete_shipment(
        db=db,
        shipment_id=shipment_id,
    )

    if deleted_shipment is None:
        raise HTTPException(status_code=404, detail="Shipment not found")

    return deleted_shipment