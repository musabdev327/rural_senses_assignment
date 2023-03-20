from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class Admin:

  def add():
    try:
      role = request.form["role"]
      user = {"email": request.form["email"], "password": request.form["password"], "role": request.form["role"]}
      dbResponse = db[role]
      dbResponse = dbResponse.insert_one(user)
      return Response(
        response=json.dumps({
          "message": "user created successfully", 
          "id":f"{dbResponse.inserted_id}"
        }),
        status=200,
        mimetype="application/json"
      )
    except Exception as ex:
      print(ex)


  def delete_user():
    print('delete user')