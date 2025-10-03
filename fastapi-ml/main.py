from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class RiskInput(BaseModel):
    heartRate: int
    steps: int
    sleepHours: int

@app.post("/risk-predict")
def risk_predict(data: RiskInput):
    risk_score = random.uniform(0, 1)  # Dummy model
    return {"risk_score": risk_score, "risk_level": "High" if risk_score > 0.7 else "Low"}

@app.post("/nlp-notes")
def nlp_notes(notes: str):
    conditions = ["diabetes", "hypertension"]
    extracted = [c for c in conditions if c in notes.lower()]
    return {"extracted_conditions": extracted}

@app.get("/analytics")
def analytics():
    return {"risk_distribution": {"High": 10, "Low": 90}}

