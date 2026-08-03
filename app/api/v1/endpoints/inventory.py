from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File
)

from sqlalchemy.orm import Session
import pandas as pd

from app.db.session import get_db
from app.models.inventory_item import InventoryItem
from app.schemas.inventory_item import (
    InventoryItemCreate,
    InventoryItemUpdate,
    InventoryItemResponse,
)


router = APIRouter()


@router.get(
    "/",
    response_model=list[InventoryItemResponse]
)
def get_inventory(
    db: Session = Depends(get_db)
):

    return db.query(InventoryItem).all()



@router.get(
    "/{inventory_id}",
    response_model=InventoryItemResponse
)
def get_inventory_by_id(
    inventory_id: int,
    db: Session = Depends(get_db)
):

    item = (
        db.query(InventoryItem)
        .filter(
            InventoryItem.id == inventory_id
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    return item



@router.post(
    "/",
    response_model=InventoryItemResponse
)
def create_inventory(
    item: InventoryItemCreate,
    db: Session = Depends(get_db)
):

    inventory = InventoryItem(
        **item.model_dump()
    )

    db.add(inventory)
    db.commit()
    db.refresh(inventory)

    return inventory



@router.put(
    "/{inventory_id}",
    response_model=InventoryItemResponse
)
def update_inventory(
    inventory_id: int,
    item: InventoryItemUpdate,
    db: Session = Depends(get_db)
):

    inventory = (
        db.query(InventoryItem)
        .filter(
            InventoryItem.id == inventory_id
        )
        .first()
    )

    if not inventory:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )


    for key, value in item.model_dump(
        exclude_unset=True
    ).items():

        setattr(
            inventory,
            key,
            value
        )


    db.commit()
    db.refresh(inventory)

    return inventory



@router.delete("/{inventory_id}")
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db)
):

    inventory = (
        db.query(InventoryItem)
        .filter(
            InventoryItem.id == inventory_id
        )
        .first()
    )

    if not inventory:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )


    db.delete(inventory)
    db.commit()


    return {
        "message": "Inventory deleted successfully"
    }



@router.post("/upload")
async def upload_inventory_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    if not file.filename.endswith(
        (".xlsx", ".xls")
    ):

        raise HTTPException(
            status_code=400,
            detail="Only Excel files are allowed"
        )


    try:

        df = pd.read_excel(
            file.file
        )


        required_columns = {
            "name",
            "description",
            "quantity",
            "price",
            "supplier_id"
        }


        missing = (
            required_columns
            -
            set(df.columns)
        )


        if missing:

            raise HTTPException(
                status_code=400,
                detail=f"Missing columns: {list(missing)}"
            )


        items = []


        for _, row in df.iterrows():

            items.append(
                InventoryItem(
                    name=str(row["name"]),
                    description=str(row["description"]),
                    quantity=int(row["quantity"]),
                    price=float(row["price"]),
                    supplier_id=int(row["supplier_id"])
                )
            )


        db.bulk_save_objects(items)

        db.commit()


        return {

            "message": "Excel imported successfully",
            "records_imported": len(items)

        }


    except HTTPException:
        raise


    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )