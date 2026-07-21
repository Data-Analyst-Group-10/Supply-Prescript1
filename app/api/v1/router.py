from fastapi import APIRouter

from app.api.v1.endpoints import (
    health,
    inventory,
    suppliers,
    orders,
    shipments,
    recommendations,
    analytics,
    prediction,
)


api_router = APIRouter()


api_router.include_router(
    health.router,
    prefix="/health",
    tags=["Health"]
)

api_router.include_router(
    inventory.router,
    prefix="/inventory",
    tags=["Inventory"]
)

api_router.include_router(
    suppliers.router,
    prefix="/suppliers",
    tags=["Suppliers"]
)

api_router.include_router(
    orders.router,
    prefix="/orders",
    tags=["Orders"]
)

api_router.include_router(
    shipments.router,
    prefix="/shipments",
    tags=["Shipments"]
)

api_router.include_router(
    recommendations.router,
    prefix="/recommendations",
    tags=["Recommendations"]
)

api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics"]
)

api_router.include_router(
    prediction.router,
    prefix="",
    tags=["Prediction"]
)