from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_predict_endpoint_returns_prediction():
    payload = {
        "features": {
            "Type": "DEBIT",
            "Customer Country": "France",
            "Market": "Europe",
            "Order Status": "PENDING",
            "Delivery Status": "Late delivery",
            "Shipping Mode": "Standard"
        }
    }

    response = client.post("/api/v1/predict", json=payload)

    assert response.status_code == 200
    body = response.json()
    assert "prediction" in body
    assert "predicted_label" in body
    assert "features_used" in body
