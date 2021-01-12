from flask import jsonify, request, send_file

from waterstatus import app

from waterstatus.models import *
from waterstatus.schemas import *

from datetime import date
import os


@app.route("/")
def main():
    index_path = os.path.join(app.static_folder, 'index.html')
    return send_file(index_path)


@app.route('/<path:path>')
def route_frontend(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_file(file_path)
    else:
        index_path = os.path.join(app.static_folder, 'index.html')
        return send_file(index_path)


@app.route('/api/areas', methods=['GET'])
def get_areas():
  areas_query = Area.query.all()
  areas = []
  for i in areas_query:
    area = {}
    area["id"] = i.id
    area["name"] = i.name
    area["status"] = i.logs[-1].status
    areas.append(area)
  return jsonify(areas)

@app.route('/api/area/<id>', methods=['GET'])
def get_area(id):
    logs = Log.query.filter_by(area_id=id).all()
    return logs_schema.jsonify(logs)

@app.route('/api/subscriptions', methods=['GET'])
def subscriptions():
  subscriptions = Subscription.query.all()
  return subscriptions_schema.jsonify(subscriptions)

@app.route('/api/subscription', methods=['POST'])
@app.route('/api/subscription/<id>', methods=['DELETE'])
def subscription(id=''):
  if request.method == 'POST':
    new_subscription = Subscription(
      user_id = request.json['user_id'],
      area_id = request.json['area_id'])
    db.session.add(new_subscription)
    db.session.commit()
    return subscription_schema.jsonify(new_subscription)
  elif request.method == 'DELETE':
    subscription = Subscription.query.filter(Subscription.id == id).first()
    db.session.delete(subscription)
    db.session.commit()
    return jsonify({'success':'Subscription deleted'})

@app.route('/api/users', methods=['GET'])
def users():
  users = User.query.all()
  return users_schema.jsonify(users)

@app.route('/api/user', methods=['POST'])
@app.route('/api/user/<id>', methods=['DELETE', 'PUT'])
def user(id = ''):
  if request.method == 'POST':
    new_user = User(
      email=request.json['email'],
      username=request.json['username'],
      gotify_token=request.json['gotify_token'],
      gotify_server_ip=request.json['gotify_server_ip'],
      discord_webhook=request.json['discord_webhook'],
      notifications_preffered_mode=request.json['notifications_preffered_mode'],
      notifications_status=request.json['notifications_status'])
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)
  elif request.method == 'PUT':
    user = User.query.filter(User.id == id).first()
    user.email=request.json['email']
    user.username=request.json['username']
    user.gotify_token=request.json['gotify_token']
    user.gotify_server_ip=request.json['gotify_server_ip']
    user.discord_webhook=request.json['discord_webhook']
    user.notifications_preffered_mode=request.json['notifications_preffered_mode']
    user.notifications_status=request.json['notifications_status']
    db.session.commit()
    return user_schema.jsonify(user)
  elif request.method == 'DELETE':
    user = User.query.filter(User.id == id).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({'success': 'User deleted'})
  
@app.route('/api/settings', methods=['GET','PUT'])
def settings():
  if request.method == 'GET':
    settings = Settings.query.first()
    return settings_schema.jsonify(settings)
  if request.method == 'PUT':
    settings = Settings.query.first()
    settings.scraper_interval = request.json['web_scraper_interval']
    settings.server_email = request.json['server_email']
    settings.server_password = request.json['server_password']
    db.session.commit()
    return settings_schema.jsonify(settings)

@app.route('/api/logs', methods=['GET'])
def logs():
  if request.method == 'GET':
    month = date.today().strftime("%m-%Y")
    directory= app.config['LOGS_DIRECTORY']
    logs = open(f'{directory}{month}.log', encoding="utf8").read().splitlines()
    return jsonify(logs)