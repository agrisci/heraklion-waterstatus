import os
import platform


from waterstatus import app



class Development(object):
    #   Flask configurations
    JSON_AS_ASCII = False
    SECRET_KEY = os.urandom(16)

    #   Database and logs directories
    if platform.system() == 'Windows':
        DATABASE_DIRECTORY = os.path.abspath(os.path.dirname(__file__)) + '\database'
        LOGS_DIRECTORY = os.path.abspath(os.path.dirname(__file__)) + '\logs\\'
    elif platform.system() == 'Linux':
        DATABASE_DIRECTORY = os.path.abspath(os.path.dirname(__file__)) + '/database'
        LOGS_DIRECTORY = os.path.abspath(os.path.dirname(__file__)) + '/logs/'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(DATABASE_DIRECTORY, 'db.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


