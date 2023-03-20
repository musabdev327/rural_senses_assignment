from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
from user.models import User
import json
import csv
import uuid

class Social_worker:

  def allowed_file(self, filename):
      return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['csv']


  def analyze_data(data):
    for records in data:
      if 'Family' in records['what bothers you?']:
        records['analysis'] = "Family"
      elif "Health" in records['what bother you?']:
        records['analysis'] = "Health"
      else:
        records['analysis'] = "Unknown"
    return data

  def upload_csv(self):
    if request.method == 'POST':
      
      data = []
      file = request.files['file']
      filename = self.allowed_file(file.filename)
      if file and filename:
        file_data = file.read().decode("utf-8").split('\n')
        file_data.pop(0)
        try:
          for data in file_data:
            data = data.split(',')
            feedback = {'what bothers you?': data[0], 'age': data[1], 'community_name': community_name or null, 'community_size': community_size or null}
            db.FeedBack.insert_one(feedback)
        except Exception as e:
          print("Error while inserting feedback - ", e)
    else: 
      return {"status": "Error", "message": "Invalid request method"}
    return {"status": 200, "message": "Feedback inserted successfully"}


  def get_feedback(self):
    if request.method == "GET":
      token = request.headers.get('token')
      user = User().authorize_token(token)
      data = db.FeedBack.find({"_id": str(user['_id'])})
      data = self.analyze_data(data)
      return {"status": 200, "data": data}