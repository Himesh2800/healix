from app import app, db, User, bcrypt

with app.app_context():
    # Clear users
    User.query.delete()
    db.session.commit()
    
    password = "password123"
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    print(f"Generated hash: {hashed}")
    
    check = bcrypt.check_password_hash(hashed, password)
    print(f"Immediate check: {check}")
    
    # Save to DB
    user = User(username="testuser", password=hashed)
    db.session.add(user)
    db.session.commit()
    
    # Retrieve
    user_db = User.query.filter_by(username="testuser").first()
    check_db = bcrypt.check_password_hash(user_db.password, password)
    print(f"DB check: {check_db}")
