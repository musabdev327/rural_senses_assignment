from flask import Flask, Response, request, render_template, session, redirect
from functools import wraps
import pymongo
import json

app = Flask(__name__)
try:
  app.config['SESSION_TYPE'] = 'memcached'
  app.config['SECRET_KEY'] = 'super secret key'
  client = pymongo.MongoClient("localhost:27017")
  db = client.get_database('citizen_portal')
  records = db.register

  print('connected to mongo')
except:
  print("Error - Cannot connect to db")
  pass


def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap


# @app.route("/admin/login", methods=["POST"])
# def login():
#   try:
#     user = {"email": request.form["email"], "password": request.form["password"], "role": request.form["role"]}
#     dbResponse = db.users.insert_one(user)
#     return Response(
#       response=json.dumps({
#         "message": "user created successfully", 
#         "id":f"{dbResponse.inserted_id}"
#       }),
#       status=200,
#       mimetype="application/json"
#     )
#   except Exception as ex:
#     print('*****************')
#     print(ex)
#     print('*****************')


from user import routes
from social_worker import routes

@app.route('/')
def home():
  return render_template('home.html')


@app.route('/dashboard/')
@login_required
def dashboard():
  return render_template('dashboard.html')


# @app.route("/users", methods=["POST"])
# def login():
#   try:
#     user = {"email": request.form["email"], "password": request.form["password"], "role": request.form["role"]}
#     dbResponse = db.users.insert_one(user)
#     return Response(
#       response=json.dumps({
#         "message": "user created successfully", 
#         "id":f"{dbResponse.inserted_id}"
#       }),
#       status=200,
#       mimetype="application/json"
#     )
#   except Exception as ex:
#     print('*****************')
#     print(ex)
#     print('*****************')



if __name__ == "__main__":
  app.run(port=8000, debug=True)