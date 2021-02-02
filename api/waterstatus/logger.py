import datetime
import os

class Logger:
    def __init__(self, app):
        self.logs_path = app.config['LOGS_DIRECTORY']

    def info(self, text):
        now = datetime.datetime.now()
        log_filename = now.strftime("%m-%Y")  + ".log"
        complete_file_path = self.logs_path + log_filename
        log = f'{now.strftime("%d-%m-%y %H:%M:%S")} - INFO - {text}'
        file = open(complete_file_path, "a")
        file.write(log + "\n")
        file.close()

