import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_recommendations():
    response = client.get("/api/v1/recommendations")
    assert response.status_code == 200
    assert "recommendations" in response.json()

def test_create_recommendation():
    response = client.post("/api/v1/recommendations", json={"data": "sample data"})
    assert response.status_code == 201
    assert "id" in response.json()