from flask import Flask
from flask_cors import CORS
from datetime import date

import os

from waterstatus.logger import Logger

app = Flask(__name__)
CORS(app)


# Set flask and db instance parameters to Development or Production
from waterstatus.configurations import *
app.config.from_object(Development)

logger = Logger(app)

import waterstatus.db
import waterstatus.schemas
import waterstatus.routes
