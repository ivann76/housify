import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import List, Optional
import json
import os

app = FastAPI(title="Malaysia Property Price Predictor")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your dataset for stats
try:
    df = pd.read_csv("KL_Property_Listing.csv")
except Exception as e:
    print(f"Error loading dataset: {str(e)}")
    df = None

# Load the trained model
try:
    with open('Price_Prediction.pkl', 'rb') as file:
        model = pickle.load(file)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    raise RuntimeError("Model initialization failed") from e


# Request model with enhanced validation
class PropertyData(BaseModel):
    Location: str = Field(..., min_length=2, max_length=50)
    Property_Type: str = Field(..., min_length=2, max_length=50)
    Built_Type: str = Field(..., min_length=2, max_length=50)
    Built_Size: float = Field(..., gt=50, lt=50000)
    Rooms: int = Field(..., ge=1, le=20)
    Bathrooms: int = Field(..., ge=1, le=10)
    Car_Parks: int = Field(..., ge=0, le=10)

    @validator('Location')
    def location_must_be_valid(cls, v):
        valid_locations = [
            "Kuala Lumpur", "Petaling Jaya", "Subang Jaya",
            "Puchong", "Cheras", "Damansara", "Mont Kiara",
            "Bangsar", "Setapak", "Ampang", "Kepong"
        ]
        if v not in valid_locations:
            raise ValueError(f"Location must be one of: {', '.join(valid_locations)}")
        return v


# Simple file-based storage (you can replace with database later)
HISTORY_FILE = "prediction_history.json"


def load_history() -> List[dict]:
    """Load prediction history from file"""
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    except:
        return []


def save_history(history: List[dict]):
    """Save prediction history to file"""
    try:
        with open(HISTORY_FILE, 'w') as f:
            json.dump(history, f, indent=2, default=str)
    except Exception as e:
        print(f"Error saving history: {e}")


# SINGLE predict_price endpoint that saves history
@app.post("/predict_price")
async def predict_price(data: PropertyData):
    try:
        # Prepare features for prediction
        features = pd.DataFrame([{
            'Location': data.Location,
            'Property Type': data.Property_Type,
            'Built_Type': data.Built_Type,
            'Built_Size': data.Built_Size,
            'Rooms': data.Rooms,
            'Bathrooms': data.Bathrooms,
            'Car Parks': data.Car_Parks
        }])

        # Make prediction
        price = model.predict(features)[0]
        predicted_price = round(float(price), 2)

        # Save to history
        history = load_history()
        new_prediction = {
            "location": data.Location,
            "property_type": data.Property_Type,
            "built_type": data.Built_Type,
            "built_size": data.Built_Size,
            "rooms": data.Rooms,
            "bathrooms": data.Bathrooms,
            "car_parks": data.Car_Parks,
            "predicted_price": predicted_price,
            "created_at": datetime.now().isoformat()
        }
        history.append(new_prediction)

        # Keep only last 100 predictions to prevent file from growing too large
        if len(history) > 100:
            history = history[-100:]

        save_history(history)

        print(f"✅ Prediction saved to history: {predicted_price}")  # Debug log

        return {"price": predicted_price}

    except Exception as e:
        print(f"❌ Error in prediction: {str(e)}")  # Debug log
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/data_stats")
async def get_data_stats():
    if df is None:
        raise HTTPException(status_code=503, detail="Dataset not available")

    return {
        "price_range": {
            "min": int(df['Price'].min()),
            "max": int(df['Price'].max())
        },
        "built_size_range": {
            "min": int(df['Built_Size'].min()),
            "max": int(df['Built_Size'].max())
        },
        "common_locations": df['Location'].value_counts().nlargest(10).to_dict(),
        "common_property_types": df['Property Type'].value_counts().to_dict()
    }


@app.get("/chart/avg_price_by_type")
def avg_price_by_type():
    result = df.groupby("Property Type")["Price"].mean().reset_index()
    result["Price"] = result["Price"].round(2)
    return result.to_dict(orient="records")


@app.get("/chart/listings_by_location")
def listings_by_location():
    df_clean = df[df["Location"].notna()]
    counts = df_clean["Location"].value_counts().head(10).reset_index()
    counts.columns = ["Location", "Count"]
    return counts.to_dict(orient="records")


@app.get("/chart/size_vs_price")
def size_vs_price():
    df_clean = df.copy()
    df_clean = df_clean[pd.to_numeric(df_clean["Built_Size"], errors='coerce').notna()]
    df_clean = df_clean[pd.to_numeric(df_clean["Price"], errors='coerce').notna()]
    df_clean["Built_Size"] = pd.to_numeric(df_clean["Built_Size"])
    df_clean["Price"] = pd.to_numeric(df_clean["Price"])
    return df_clean[["Built_Size", "Price"]].to_dict(orient="records")


# Add this new model for history storage
class PredictionHistory(BaseModel):
    location: str
    property_type: str
    built_type: str
    built_size: float
    rooms: int
    bathrooms: int
    car_parks: int
    predicted_price: float
    created_at: datetime


# Add new endpoint to get prediction history
@app.get("/history/predictions")
async def get_prediction_history():
    """Get all prediction history"""
    try:
        history = load_history()
        print(f"📊 Loaded {len(history)} predictions from history")  # Debug log
        # Return most recent first
        return sorted(history, key=lambda x: x['created_at'], reverse=True)
    except Exception as e:
        print(f"❌ Error loading history: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=f"Error loading history: {str(e)}")


# Add endpoint to clear history (optional)
@app.delete("/history/predictions")
async def clear_prediction_history():
    """Clear all prediction history"""
    try:
        save_history([])
        return {"message": "History cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing history: {str(e)}")


# Add endpoint to get history statistics
@app.get("/history/stats")
async def get_history_stats():
    """Get statistics about prediction history"""
    try:
        history = load_history()
        if not history:
            return {
                "total_predictions": 0,
                "avg_predicted_price": 0,
                "favorite_location": "None",
                "favorite_property_type": "None"
            }

        total_predictions = len(history)
        avg_predicted_price = sum(pred['predicted_price'] for pred in history) / total_predictions

        # Count occurrences
        location_counts = {}
        property_type_counts = {}

        for pred in history:
            location = pred['location']
            prop_type = pred['property_type']

            location_counts[location] = location_counts.get(location, 0) + 1
            property_type_counts[prop_type] = property_type_counts.get(prop_type, 0) + 1

        favorite_location = max(location_counts, key=location_counts.get) if location_counts else "None"
        favorite_property_type = max(property_type_counts,
                                     key=property_type_counts.get) if property_type_counts else "None"

        return {
            "total_predictions": total_predictions,
            "avg_predicted_price": round(avg_predicted_price, 2),
            "favorite_location": favorite_location,
            "favorite_property_type": favorite_property_type,
            "location_distribution": location_counts,
            "property_type_distribution": property_type_counts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating stats: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)