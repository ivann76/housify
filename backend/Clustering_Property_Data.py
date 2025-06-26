#!/usr/bin/env python
# coding: utf-8

# In[29]:


import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import seaborn as sns


# In[30]:


# Load dataset again (same structure as training data)
df = pd.read_csv("KL_Property_Listing.csv")


# In[31]:


features = df[['Price', 'Built_Size', 'Rooms', 'Bathrooms', 'Car Parks']]


# In[32]:


# Standardize features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)


# In[48]:


dbscan = DBSCAN(eps=0.8, min_samples=10)  # You may need to tune eps/min_samples
clusters = dbscan.fit_predict(scaled_features)


# In[49]:


df['Cluster'] = clusters


# In[50]:


# Count of each cluster
print("Cluster label counts:")
print(df['Cluster'].value_counts())

# Silhouette score (only if more than 1 cluster and no -1-only)
n_clusters = len(set(clusters)) - (1 if -1 in clusters else 0)
if n_clusters > 1:
    score = silhouette_score(scaled_features, clusters)
    print(f"\nSilhouette Score: {score:.2f}")
else:
    print("\nSilhouette Score: Not available (less than 2 clusters)")


# In[60]:


# Identify noise points (labeled as -1)
noise_points = df[df['Cluster'] == -1]
print(f"\nNumber of noise points: {len(noise_points)}")


# In[61]:


plt.figure(figsize=(8, 5))
sns.scatterplot(data=df, x='Rooms', y='Price', hue='Cluster', palette='Set1')
plt.title('DBSCAN Clusters by Price and Built Size')
plt.grid(True)
plt.show()


# In[62]:


plt.figure(figsize=(8, 5))
sns.scatterplot(data=df, x='Rooms', y='Price', hue='Cluster', palette='viridis')

# Set axis limits to zoom in
plt.xlim(df['Rooms'].quantile(0.1), df['Rooms'].quantile(0.9))  # Focus on middle 80%
plt.ylim(df['Price'].quantile(0.1), df['Price'].quantile(0.9))  # Focus on middle 80%

plt.title('DBSCAN Clusters (Zoomed on Dense Region)')
plt.show()


# In[63]:


from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')

scatter = ax.scatter(df['Rooms'], df['Price'], df['Bathrooms'], 
                    c=df['Cluster'], cmap='viridis', s=50)

# Set viewing angle and limits
ax.set_xlim(df['Built_Size'].quantile(0.1), df['Built_Size'].quantile(0.9))
ax.set_ylim(df['Price'].quantile(0.1), df['Price'].quantile(0.9))
ax.view_init(elev=20, azim=45)  # Adjust viewing angle

ax.set_xlabel('Built Size')
ax.set_ylabel('Price')
ax.set_zlabel('Rooms')
plt.title('3D Cluster Visualization')
plt.colorbar(scatter)
plt.show()


# In[66]:


import pickle

with open('Clustering_Features.pkl', 'wb') as file:
    pickle.dump(dbscan, file)


# In[ ]:




