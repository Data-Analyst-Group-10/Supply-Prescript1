from pathlib import Path
from typing import List
import pandas as pd
import joblib
import numpy as np

class ForecastingService:
    def __init__(self, model_path: str):
        resolved_path = Path(model_path)
        if not resolved_path.is_absolute():
            resolved_path = Path(__file__).resolve().parents[1] / resolved_path
        self.model_path = resolved_path
        self.model = None
        if self.model_path.exists():
            self.model = joblib.load(self.model_path)

    def predict(self, features: List[float]) -> float:
        if self.model is None:
            raise RuntimeError(f"Model file not found at {self.model_path}")
        features_array = np.array(features).reshape(1, -1)
        prediction = self.model.predict(features_array)
        return prediction[0]

    def load_data(self, file_path: str) -> pd.DataFrame:
        return pd.read_csv(file_path)

    def preprocess_data(self, df: pd.DataFrame) -> pd.DataFrame:
        # Implement preprocessing steps here
        return df

    def forecast(self, file_path: str) -> float:
        df = self.load_data(file_path)
        processed_data = self.preprocess_data(df)
        features = processed_data.iloc[:, :-1].values.flatten()  # Assuming last column is the target
        return self.predict(features)