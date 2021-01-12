import os
from flask_sqlalchemy import SQLAlchemy

from waterstatus import app
db = SQLAlchemy(app)

from waterstatus.models import *
from waterstatus.scraper import *


def database_initialization():
    if not os.path.exists(app.config['DATABASE_DIRECTORY'] + '/db.sqlite'):
        db.create_all()
        # logging.info("Database created successfully...")
        # logging.info("Initializing areas table...")
        for x in areas:
            db.session.add(Area(name=x))
        # logging.info("Initializing settings table...")
        db.session.add(Settings())
        db.session.commit()
        # logging.info("Database tables initialized successfully...")
    else:
        pass
        # logging.info("Skipping database creation... Database allready exists")

database_initialization()