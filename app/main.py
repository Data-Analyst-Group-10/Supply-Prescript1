from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.logging import setup_logging

# Database imports
from app.db.session import engine
from app.db.base import Base
from app import models


app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Setup logging
setup_logging()


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {
        "message": "Welcome to SupplyPrescript – Closed-Loop Prescriptive Analytics API"
    }