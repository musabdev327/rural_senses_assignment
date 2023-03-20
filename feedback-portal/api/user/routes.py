from flask import Flask
from app import app
from user.models import User


# @app.route('/user', methods=['GET'])
# def get_user():
#   print('user not found')
# @app.route('/user/signup', methods=['POST'])
# def signup():
#   return User().signup()

@app.route('/user/signout')
def signout():
  return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
  response = User().login()
  print("RESPONSE", response)
  return response
  