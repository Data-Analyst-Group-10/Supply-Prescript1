from typing import Any, Dict, List

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    features: Dict[str, Any] = Field(..., description="Feature values for the prediction request")


class PredictionResponse(BaseModel):
    prediction: Any
    predicted_label: str
    features_used: List[str]
