from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import datetime
import jwt
import json
import uuid

class User:

  def authorize_token(self, token):
    user_id = self.decode_auth_token(token)
    print(user_id)
    try:
      user = db.users.find_one({"_id":user_id})
      if user:
        return user
      else:
        return {"Error": "Invalid token"}
    except exception as e:
      print("Invalid token: " + str(e))
      return {"Error": e}

  def decode_auth_token(self, token):
    return jwt.decode(bytes(token), "secret", algorithms=["HS256"])    

  def encode_auth_token(self, user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        # print("ses", secret_key)
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            "super_secret_key",
            algorithm='HS256'
        )
    except Exception as e:
        return e

  def start_session(self, user):
    token = self.encode_auth_token(str(user['_id']))
    del user['password']
    session['logged_in'] = True
    del(user['_id'])
    session['user'] = user
    print('session', session)
    return {
      "status": 200,
      "message": f"{user.get('email')} has been logged in",
      "token": token
    }

  # def signup(self):
  #   print(request.form)

  #   # Create the user object
  #   user = {
  #     "_id": uuid.uuid4().hex,
  #     "name": request.form.get('name'),
  #     "email": request.form.get('email'),
  #     "password": request.form.get('password')
  #   }

  #   # Encrypt the password
  #   user['password'] = pbkdf2_sha256.encrypt(user['password'])

  #   # Check for existing email address
  #   if db.users.find_one({ "email": user['email'] }):
  #     return jsonify({ "error": "Email address already in use" }), 400

  #   if db.users.insert_one(user):
  #     return self.start_session(user)

  #   return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def login(self):
    role = request.form.get('role')
    print(db.users)
    user = db.users.find_one({
      "role": request.form.get('role'),
      "email": request.form.get('email')
    })
    print(user)
    print(request.form.get('password'))
    print(user['password'])
    if user and (request.form.get('password'), user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401