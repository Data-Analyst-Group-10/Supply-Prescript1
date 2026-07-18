import pandas as pd
import joblib
from fastapi import HTTPException

class InferenceModel:
    def __init__(self, model_path: str):
        self.model = joblib.load(model_path)

    def predict(self, input_data: pd.DataFrame):
        try:
            predictions = self.model.predict(input_data)
            return predictions
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

model = InferenceModel("ml/model.pkl")  # Adjust the path as necessary

def make_prediction(input_data: pd.DataFrame):
    return model.predict(input_data)