import os
from flask_sqlalchemy import SQLAlchemy

from waterstatus import app, logger
db = SQLAlchemy(app)

from waterstatus.models import *
from waterstatus.scraper import *


def database_initialization():
    if not os.path.exists(app.config['DATABASE_DIRECTORY'] + '/db.sqlite'):
        db.create_all()
        logger.debug("Database created successfully...")
        logger.debug("Initializing areas table...")
        for x in areas:
            db.session.add(Area(name=x))
        logger.debug("Initializing settings table...")
        db.session.add(Settings())
        db.session.commit()
        logger.debug("Database tables initialized successfully...")

database_initialization()