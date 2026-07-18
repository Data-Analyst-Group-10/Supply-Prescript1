# SupplyPrescript – Closed-Loop Prescriptive Analytics

## Overview
SupplyPrescript is a FastAPI-based backend application designed to provide closed-loop prescriptive analytics for supply chain management. The application offers various endpoints for managing inventory, suppliers, orders, shipments, and generating recommendations based on historical data.

## Project Structure
```
supplyprescript-backend
├── app
│   ├── api
│   ├── core
│   ├── crud
│   ├── db
│   ├── models
│   ├── schemas
│   ├── services
│   ├── utils
│   └── main.py
├── ml
├── alembic
├── tests
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
├── requirements.txt
└── README.md
```

## Features
- **Health Check Endpoint**: Verify the status of the API.
- **Inventory Management**: CRUD operations for inventory items.
- **Supplier Management**: CRUD operations for suppliers.
- **Order Management**: Create and retrieve orders.
- **Shipment Tracking**: Manage and track shipments.
- **Recommendations**: Generate recommendations based on user input and historical data.
- **Analytics**: Retrieve analytical data for better decision-making.

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip
- Docker (optional)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd supplyprescript-backend
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and update the values as needed.

### Running the Application
To run the FastAPI application, execute:
```
uvicorn app.main:app --reload
```

### Docker
To build and run the application using Docker, execute:
```
docker-compose up --build
```

### Testing
To run the tests, use:
```
pytest
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.