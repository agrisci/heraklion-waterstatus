from flask import Flask
from flask_cors import CORS
from datetime import date

import logging
import os


app = Flask(__name__)
CORS(app)


# Set flask and db instance parameters to Development or Production
from waterstatus.configurations import *
app.config.from_object(Development)

# month = date.today().strftime("%m-%Y")
# log = logging.getLogger('werkzeug')
# log.disabled = True
# logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%d/%m/%Y %I:%M:%S %p', filename='{}{}.log'.format(app.config['LOGS_DIRECTORY'],month), encoding='utf-8', level=logging.INFO)

import waterstatus.db
import waterstatus.schemas
import waterstatus.routes
