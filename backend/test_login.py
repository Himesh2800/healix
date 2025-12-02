import requests

# Use the user created in the previous step (or create a new one if needed, but let's try the one we just made)
# Username from previous step output: zsrzawbc
# Password: password123

username = "zsrzawbc"
password = "password123"

url = "http://localhost:5000/auth/login"
data = {
    "username": username,
    "password": password
}

try:
    print(f"Attempting login for {username}...")
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
