import requests

# Use the user created previously
username = "zsrzawbc"
password = "password123"

# 1. Login to get token
login_url = "http://localhost:5000/auth/login"
session = requests.Session()
login_resp = session.post(login_url, json={"username": username, "password": password})
print(f"Login Status: {login_resp.status_code}")

if login_resp.status_code == 200:
    # 2. Create a dummy prediction to delete
    predict_url = "http://localhost:5000/predict"
    predict_data = {"symptoms": ["itching", "skin_rash"]}
    predict_resp = session.post(predict_url, json=predict_data)
    print(f"Predict Status: {predict_resp.status_code}")
    
    # 3. Get History to find the ID
    history_url = "http://localhost:5000/history"
    history_resp = session.get(history_url)
    history_data = history_resp.json()
    print(f"History Items: {len(history_data['history'])}")
    
    if len(history_data['history']) > 0:
        item_id = history_data['history'][0]['id']
        print(f"Deleting item ID: {item_id}")
        
        # 4. Delete the item
        delete_url = f"http://localhost:5000/history/{item_id}"
        delete_resp = session.delete(delete_url)
        print(f"Delete Status: {delete_resp.status_code}")
        print(f"Delete Response: {delete_resp.json()}")
        
        # 5. Verify deletion
        history_resp_after = session.get(history_url)
        print(f"History Items After Delete: {len(history_resp_after.json()['history'])}")
    else:
        print("No history items found to delete.")
else:
    print("Login failed.")
