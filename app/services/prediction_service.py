from typing import Any, Dict

from ml.inference import InferenceModel


class PredictionService:
    def __init__(self, model_path: str | None = None) -> None:
        self.inference_model = InferenceModel(model_path=model_path)

    def predict(self, features: Dict[str, Any]) -> Dict[str, Any]:
        return self.inference_model.predict(features)


prediction_service = PredictionService()
