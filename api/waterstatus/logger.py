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
        file = open(complete_file_path, "a", encoding="utf8")
        file.write(log + "\n")
        file.close()

    def debug(self, text):
        now = datetime.datetime.now()
        log_filename = now.strftime("%m-%Y")  + ".log"
        complete_file_path = self.logs_path + log_filename
        log = f'{now.strftime("%d-%m-%y %H:%M:%S")} - DEBUG - {text}'
        file = open(complete_file_path, "a", encoding="utf8")
        file.write(log + "\n")
        file.close()

    def read_logs(self):
        now = datetime.datetime.now()
        log_filename = now.strftime("%m-%Y")  + ".log"
        complete_file_path = self.logs_path + log_filename
        log_file_exists = os.path.exists(complete_file_path)
        if log_file_exists:
            logs = open(complete_file_path, encoding="utf8").read().splitlines()
            return logs
        else:
            logs = ["No Logs Yet"]
            return logs