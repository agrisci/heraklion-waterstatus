import datetime

from waterstatus.db import db


class Area(db.Model): # An area has many logs
    id = db.Column(db.Integer, unique = True, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    logs = db.relationship('Log', backref='area', lazy=True)
    
class Log(db.Model): # A log belongs to an area
    id = db.Column(db.Integer, unique = True, primary_key=True)
    datetime = db.Column(db.DateTime, nullable = False, default=datetime.datetime.now)
    status = db.Column(db.Boolean, nullable = False)
    area_id = db.Column(db.Integer, db.ForeignKey('area.id'), nullable=False)

class User(db.Model): # A user has many subscriptions
    id = db.Column(db.Integer, unique = True, primary_key=True)
    username = db.Column(db.String(), unique = True)
    email = db.Column(db.String(), default="")
    gotify_token = db.Column(db.String(), default="")
    gotify_server_ip = db.Column(db.String(), default="")
    discord_webhook = db.Column(db.String(), default="")
    notifications_preffered_mode = db.Column(db.String(), default="") #discord,gotify,email etc
    notifications_status = db.Column(db.Boolean(), default=False) #on or off
    subscriptions = db.relationship('Subscription', backref='subscription', cascade="all, delete-orphan", lazy=True)

class Subscription(db.Model): # A subscription has an area and a user
    id = db.Column(db.Integer, unique = True, primary_key = True)
    area_id = db.Column(db.Integer, db.ForeignKey('area.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Settings(db.Model): # Settings are universal for all users
    id = db.Column(db.Integer, unique = True, primary_key = True)
    web_scraper_interval = db.Column(db.Integer(), default=10)
    server_email = db.Column(db.String(), default="")
    server_password = db.Column(db.String(), default="")
    
