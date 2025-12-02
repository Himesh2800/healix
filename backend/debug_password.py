from app import app, db, User, bcrypt

with app.app_context():
    user = User.query.filter_by(username='testuser').first()
    if user:
        print(f"User found: {user.username}")
        print(f"Hash: {user.password}")
        is_valid = bcrypt.check_password_hash(user.password, 'password123')
        print(f"Password 'password123' valid: {is_valid}")
    else:
        print("User not found")
