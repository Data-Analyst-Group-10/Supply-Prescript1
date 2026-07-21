# SupplyPrescript – Closed-Loop Prescriptive Analytics

## Overview

SupplyPrescript is a FastAPI-based backend application designed to provide closed-loop prescriptive analytics for supply chain management.

The application provides APIs for managing inventory, suppliers, orders, shipments, analytics, recommendations, and machine learning-based predictions using historical supply chain data.

---

## Project Structure
## Features

### Health Check
- Verify API availability and server status.

### Inventory Management
- Create, read, update, and delete inventory records.

### Supplier Management
- Manage supplier information.

### Order Management
- Create and retrieve order details.

### Shipment Tracking
- Track shipment information.

### Analytics
- Generate supply chain insights.

### Recommendation System
- Provide recommendations based on supply chain data.

### Machine Learning Prediction
- Predict shipping mode using an XGBoost classification model.

---

## Machine Learning

### Algorithm Used

- XGBoost Classifier
- Pandas
- Scikit-learn
- Label Encoder

### Prediction Target
Shipping Mode
### Model File

ml/model/xgboost_model.joblib