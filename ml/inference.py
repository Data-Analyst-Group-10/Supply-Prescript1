from pathlib import Path
from typing import Any, Dict

import joblib
import pandas as pd


class InferenceModel:
    def __init__(self, model_path: str | None = None) -> None:
        self.model_path = self._resolve_model_path(model_path)
        self.model = None
        self.encoders = {}
        self.target_encoder = None
        self.features: list[str] = []
        self.ready = False
        self.error_message = ""
        self._load_model()

    def _resolve_model_path(self, model_path: str | None) -> Path:
        if model_path:
            path = Path(model_path)
            if not path.is_absolute():
                path = (Path(__file__).resolve().parent.parent / path).resolve()
            return path

        return (Path(__file__).resolve().parent.parent / "ml" / "model" / "xgboost_model.joblib").resolve()

    def _load_model(self) -> None:
        try:
            if not self.model_path.exists():
                raise FileNotFoundError(f"Model file not found at {self.model_path}")

            data = joblib.load(self.model_path)
            self.model = data["model"]
            self.encoders = data["encoders"]
            self.target_encoder = data["target_encoder"]
            self.features = data["features"]
            self.ready = True
        except Exception as exc:  # pragma: no cover - defensive fallback
            self.ready = False
            self.error_message = str(exc)

    def predict(self, input_data: Any) -> Dict[str, Any]:
        if not self.ready or self.model is None or self.target_encoder is None:
            raise RuntimeError(self.error_message or "Model is not available")

        try:
            if isinstance(input_data, dict):
                payload = pd.DataFrame([input_data])
            elif isinstance(input_data, pd.DataFrame):
                payload = input_data.copy()
            else:
                raise ValueError("Input data must be a dictionary or pandas DataFrame")

            payload = payload.copy()
            for feature in self.features:
                if feature not in payload.columns:
                    payload[feature] = None

            payload = payload[self.features]

            for col, encoder in self.encoders.items():
                if col in payload.columns:
                    payload[col] = payload[col].fillna("Unknown").astype(str)
                    known_values = {str(value) for value in encoder.classes_.tolist()}

                    def _encode_value(value: Any) -> int:
                        value_str = str(value)
                        if value_str in known_values:
                            return int(encoder.transform([value_str])[0])
                        fallback = next(iter(known_values), "Unknown")
                        return int(encoder.transform([fallback])[0])

                    payload[col] = payload[col].apply(_encode_value)

            for col in payload.columns:
                if col not in self.encoders:
                    payload[col] = pd.to_numeric(payload[col], errors="coerce").fillna(0)

            prediction = self.model.predict(payload)
            predicted_label = self.target_encoder.inverse_transform(prediction)[0]

            return {
                "prediction": predicted_label,
                "predicted_label": predicted_label,
                "features_used": self.features,
            }
        except Exception as exc:  # pragma: no cover - defensive fallback
            raise RuntimeError(str(exc)) from exc


model = InferenceModel()


def make_prediction(input_data: pd.DataFrame) -> Dict[str, Any]:
    return model.predict(input_data)