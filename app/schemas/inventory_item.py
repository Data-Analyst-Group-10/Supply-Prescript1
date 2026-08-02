from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import pandas as pd

from app.db.session import get_db
from app.models.inventory_item import InventoryItem
from app.schemas.inventory_item import InventoryCreate, InventoryUpdate

router = APIRouter()


# =========================
# GET ALL INVENTORY
# =========================

@router.get("/")
def get_inventory(db: Session = Depends(get_db)):
    return db.query(InventoryItem).all()


# =========================
# GET INVENTORY BY ID
# =========================

@router.get("/{inventory_id}")
def get_inventory_by_id(
    inventory_id: int,
    db: Session = Depends(get_db),
):
    item = (
        db.query(InventoryItem)
        .filter(InventoryItem.id == inventory_id)
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found",
        )

    return item


# =========================
# CREATE INVENTORY
# =========================

@router.post("/")
def create_inventory(
    item: InventoryCreate,
    db: Session = Depends(get_db),
):
    inventory = InventoryItem(**item.model_dump())

    db.add(inventory)
    db.commit()
    db.refresh(inventory)

    return inventory


# =========================
# UPDATE INVENTORY
# =========================

@router.put("/{inventory_id}")
def update_inventory(
    inventory_id: int,
    item: InventoryUpdate,
    db: Session = Depends(get_db),
):
    inventory = (
        db.query(InventoryItem)
        .filter(InventoryItem.id == inventory_id)
        .first()
    )

    if not inventory:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found",
        )

    update_data = item.model_dump()

    for key, value in update_data.items():
        setattr(inventory, key, value)

    db.commit()
    db.refresh(inventory)

    return inventory


# =========================
# DELETE INVENTORY
# =========================

@router.delete("/{inventory_id}")
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
):
    inventory = (
        db.query(InventoryItem)
        .filter(InventoryItem.id == inventory_id)
        .first()
    )

    if not inventory:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found",
        )

    db.delete(inventory)
    db.commit()

    return {
        "message": "Inventory deleted successfully"
    }


# =========================
# IMPORT INVENTORY FROM EXCEL
# =========================

@router.post("/upload")
async def upload_inventory_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:

        if not file.filename.endswith((".xlsx", ".xls")):
            raise HTTPException(
                status_code=400,
                detail="Please upload an Excel file.",
            )

        df = pd.read_excel(file.file)

        required_columns = [
            "name",
            "description",
            "quantity",
            "price",
            "supplier_id",
        ]

        for column in required_columns:
            if column not in df.columns:
                raise HTTPException(
                    status_code=400,
                    detail=f"Missing column: {column}",
                )

        count = 0

        for _, row in df.iterrows():

            inventory = InventoryItem(
                name=str(row["name"]),
                description=str(row["description"]),
                quantity=int(row["quantity"]),
                price=float(row["price"]),
                supplier_id=int(row["supplier_id"]),
            )

            db.add(inventory)
            count += 1

        db.commit()

        return {
            "message": "Excel imported successfully",
            "records_imported": count,
        }

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )