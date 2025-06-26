import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import os

DATA_PATH = "KL_Property_Listing.csv"
IMG_PATH = "static/images"

def load_data():
    return pd.read_csv(DATA_PATH)

def generate_charts():
    df = load_data()

    # Create output folder
    os.makedirs(IMG_PATH, exist_ok=True)

    # --- 1. Price Distribution ---
    plt.figure(figsize=(8, 5))
    sns.histplot(df['Price'], bins=50, kde=True)
    plt.title("Distribution of Property Prices")
    plt.xlabel("Price")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.savefig(f"{IMG_PATH}/price_distribution.png")
    plt.close()

    # --- 2. Boxplot by Property Type ---
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=df, x='Property Type', y='Price')
    plt.xticks(rotation=45)
    plt.title("Price by Property Type")
    plt.tight_layout()
    plt.savefig(f"{IMG_PATH}/boxplot_property_type.png")
    plt.close()

    # --- 3. Clustering Plot ---
    features = df[['Price', 'Built_Size', 'Rooms', 'Bathrooms', 'Car Parks']].copy()
    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    dbscan = DBSCAN(eps=0.8, min_samples=10)
    clusters = dbscan.fit_predict(scaled)
    df['Cluster'] = clusters

    plt.figure(figsize=(8, 5))
    sns.scatterplot(data=df, x='Rooms', y='Price', hue='Cluster', palette='Set1')
    plt.title("DBSCAN Clusters (Rooms vs Price)")
    plt.tight_layout()
    plt.savefig(f"{IMG_PATH}/dbscan_clusters.png")
    plt.close()

    return {
        "price_distribution": "/static/images/price_distribution.png",
        "boxplot_property_type": "/static/images/boxplot_property_type.png",
        "dbscan_clusters": "/static/images/dbscan_clusters.png"
    }
