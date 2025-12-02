import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
import joblib
import os

# Define symptoms and diseases
# This is a simplified synthetic dataset for demonstration
symptoms_list = [
    'fever', 'cough', 'fatigue', 'headache', 'nausea', 'vomiting', 
    'diarrhea', 'muscle_pain', 'sore_throat', 'shortness_of_breath',
    'chills', 'chest_pain', 'loss_of_taste', 'loss_of_smell', 'rash'
]

diseases = {
    'Flu': ['fever', 'cough', 'fatigue', 'headache', 'muscle_pain', 'chills'],
    'Common Cold': ['cough', 'sore_throat', 'runny_nose', 'sneezing'], # runny_nose, sneezing not in list, let's add them or map to existing
    'COVID-19': ['fever', 'cough', 'fatigue', 'loss_of_taste', 'loss_of_smell', 'shortness_of_breath'],
    'Food Poisoning': ['nausea', 'vomiting', 'diarrhea', 'stomach_pain'], # stomach_pain not in list
    'Migraine': ['headache', 'nausea', 'sensitivity_to_light'], # sensitivity not in list
    'Malaria': ['fever', 'chills', 'sweating', 'headache', 'nausea'], # sweating not in list
    'Pneumonia': ['cough', 'fever', 'chills', 'shortness_of_breath', 'chest_pain']
}

# Update symptoms list with missing ones for completeness
extra_symptoms = ['runny_nose', 'sneezing', 'stomach_pain', 'sensitivity_to_light', 'sweating']
symptoms_list.extend(extra_symptoms)
symptoms_list = sorted(list(set(symptoms_list)))

def generate_synthetic_data(num_samples=1000):
    data = []
    labels = []
    
    for _ in range(num_samples):
        disease = np.random.choice(list(diseases.keys()))
        disease_symptoms = diseases[disease]
        
        # Create a sample vector
        sample = {symptom: 0 for symptom in symptoms_list}
        
        # Randomly select some symptoms from the disease profile
        # We assume a patient has most but maybe not all symptoms
        num_present = np.random.randint(1, len(disease_symptoms) + 1)
        present_symptoms = np.random.choice(disease_symptoms, num_present, replace=False)
        
        for s in present_symptoms:
            if s in sample:
                sample[s] = 1
                
        # Add some noise (random unrelated symptoms) - very low probability
        if np.random.random() < 0.1:
            random_symptom = np.random.choice(symptoms_list)
            sample[random_symptom] = 1
            
        data.append(list(sample.values()))
        labels.append(disease)
        
    return np.array(data), np.array(labels)

def train_models():
    print("Generating synthetic data...")
    X, y = generate_synthetic_data()
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {
        'RandomForest': RandomForestClassifier(n_estimators=100, random_state=42),
        'SVC': SVC(probability=True, random_state=42),
        'NaiveBayes': GaussianNB()
    }
    
    trained_models = {}
    
    print("Training models...")
    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        print(f"{name} Accuracy: {acc:.4f}")
        trained_models[name] = model
        
    # Save artifacts
    if not os.path.exists('models'):
        os.makedirs('models')
        
    joblib.dump(trained_models, 'models/disease_prediction_models.pkl')
    joblib.dump(symptoms_list, 'models/symptoms_list.pkl')
    print("Models and symptoms list saved to 'models/' directory.")

if __name__ == "__main__":
    train_models()
