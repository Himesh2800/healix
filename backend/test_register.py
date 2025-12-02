import requests
import random
import string

# Generate random username
username = ''.join(random.choices(string.ascii_lowercase, k=8))
password = "password123"

url = "http://localhost:5000/auth/register"
data = {
    "username": username,
    "password": password
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response JSON: {response.json()}")
    
    # Check for cookies
    cookies = response.cookies
    print("Cookies received:")
    for cookie in cookies:
        print(f" - {cookie.name}: {cookie.value}")
        
    if 'access_token_cookie' in cookies:
        print("SUCCESS: Access token cookie received!")
    else:
        print("FAILURE: No access token cookie found.")
        
except Exception as e:
    print(f"Error: {e}")
