from flask import Flask
from app import app
from social_worker.models import Social_worker

@app.route('/social-worker/upload', methods=['POST'])
def upload_csv():
  return Social_worker().upload_csv()

@app.route('/social-worker/get_feedback', methods=['GET'])
def get_feedback():
  return Social_worker().get_feedback()
