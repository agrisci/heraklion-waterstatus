from flask_marshmallow import Marshmallow
from marshmallow import ValidationError, validates, validate, validates_schema, Schema, fields
from flask import json

from waterstatus import app
from waterstatus.models import *
ma = Marshmallow(app)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class SubscriptionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Subscription
    area_id = ma.auto_field()
    user_id = ma.auto_field()

class LogSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Log

class AreaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Area
    # logs = fields.List(fields.Nested(LogSchema(only=("status","datetime",))))


class SettingsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Settings


settings_schema = SettingsSchema()

logs_schema = LogSchema(many=True)

area_schema = AreaSchema()
areas_schema = AreaSchema(many= True)

user_schema = UserSchema()
users_schema = UserSchema(many= True)

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many = True)


