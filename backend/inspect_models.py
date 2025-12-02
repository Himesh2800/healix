import joblib
import os

try:
    models = joblib.load('models/disease_prediction_models.pkl')
    print("Models loaded.")
    for name, model in models.items():
        print(f"Model: {name}")
        if hasattr(model, 'classes_'):
            print(f"Classes: {model.classes_}")
        else:
            print("No classes_ attribute found.")
except Exception as e:
    print(f"Error: {e}")
