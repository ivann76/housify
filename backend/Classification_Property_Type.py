#!/usr/bin/env python
# coding: utf-8

# In[21]:


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix


# In[3]:


# Load dataset again (same structure as training data)
df = pd.read_csv("KL_Property_Listing.csv")


# In[23]:


# Features and target
features = ['Location', 'Rooms', 'Bathrooms', 'Car Parks', 'Built_Type', 'Built_Size']
target = 'Property Type'  # You can change to 'Location' or custom 'Price Category'

X = df[features]
y = df[target]


# In[24]:


# Define categorical and numeric features
categorical = ['Location', 'Built_Type']
numerical = ['Rooms', 'Bathrooms', 'Car Parks', 'Built_Size']


# In[25]:


# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical)
    ],
    remainder='passthrough'  # Keep numerical as-is
)

# Pipeline: Preprocessing + Classifier
clf = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])


# In[26]:


# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# In[27]:


# Fit model
clf.fit(X_train, y_train)


# In[28]:


# Evaluate
y_pred = clf.predict(X_test)
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# In[29]:


import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

# Create confusion matrix
cm = confusion_matrix(y_test, y_pred, labels=clf.classes_)
cm_df = pd.DataFrame(cm, index=clf.classes_, columns=clf.classes_)

# Plot heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(cm_df, annot=True, fmt='d', cmap='Blues', cbar=False)
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix - Property Classification")
plt.tight_layout()
plt.show()


# In[30]:


import pickle

with open('Classification_Property.pkl', 'wb') as file:
    pickle.dump(model, file)


# In[ ]:




