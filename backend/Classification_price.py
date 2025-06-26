#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix


# In[6]:


# Load dataset again (same structure as training data)
df = pd.read_csv("KL_Property_Listing.csv")


# In[7]:


# Create price categories using quantiles
df['Price_Category'] = pd.qcut(df['Price'], q=3, labels=['Low', 'Mid', 'High'])


# In[8]:


# Encode categorical features (if needed)
df_encoded = pd.get_dummies(df[['Location', 'Property Type', 'Built_Type']], drop_first=True)


# In[9]:


# Combine with numerical features
X = pd.concat([df[['Rooms', 'Bathrooms', 'Car Parks', 'Built_Size']], df_encoded], axis=1)
y = df['Price_Category']


# In[10]:


# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)


# In[11]:


# Train classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)


# In[12]:


# Predict and evaluate
y_pred = clf.predict(X_test)

print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))


# In[ ]:




