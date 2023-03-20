from flask import Flask
from app import app
from admin.models import Admin

@app.route('/admin')
def get_users():
  return Admin.get_users()

@app.route('/admin/add-public-official')
@app.route('/admin/add-social-worker')
def add():
  return Admin().add_user()

@app.route('/admin/delete-public-official')
@app.route('/admin/delete-social-worker')
def add():
  return Admin().delete_user()
