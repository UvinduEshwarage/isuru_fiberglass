from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

# Load model lazily to avoid import errors
model = None


def get_model():
    global model
    if model is None:
        model = joblib.load("ML/rf_model.pkl")
    return model


@app.get("/")
def root():
    return {"message": "ML service running"}


@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])

    prediction = get_model().predict(df)[0]

    return {
        "predicted_revenue": float(prediction)
    }
