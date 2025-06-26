import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pickle

# Load the dataset
df = pd.read_csv("Kl_Property_Listing.csv")

# Define features and target
features = ['Location', 'Rooms', 'Bathrooms', 'Car Parks', 'Property Type', 'Built_Type', 'Built_Size']
target = 'Price'

X = df[features]
y = df[target]

# Define the categorical and numeric columns
categorical_features = ['Location', 'Property Type', 'Built_Type']
numeric_features = ['Rooms', 'Bathrooms', 'Car Parks', 'Built_Size']

# Preprocessing step: OneHotEncoder for categorical columns
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ],
    remainder='passthrough'  # Keep numeric features as they are
)

# Define the pipeline: preprocessing step + regressor
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Fit the pipeline to the training data (this is crucial)
pipeline.fit(X_train, y_train)

# Save the trained model using pickle
with open('Price_Prediction.pkl', 'wb') as file:
    pickle.dump(pipeline, file)

print("Model training complete and saved!")
