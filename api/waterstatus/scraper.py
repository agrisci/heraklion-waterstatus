from discord_webhook import DiscordWebhook, DiscordEmbed
from bs4 import BeautifulSoup
import cloudscraper
import smtplib, ssl

import logging
import threading
import requests
import queue
import time
import os

from waterstatus import logger
from waterstatus.db import *
from waterstatus.schemas import *

areas = [
    "ΑΛΙΚΑΡΝΑΣΣΟΣ-ΘΑΛΑΣΣΙΝΑ","ΑΛΙΚΑΡΝΑΣΣΟΣ-ΓΕΩΡΓΙΚΑ",
    "ΑΝΩ ΑΛΙΚΑΡΝΑΣΣΟΣ","ΣΥΝΟΙΚΙΑ - ΚΑΤΣΑΜΠΑΣ ΙΙ",
    "ΣΥΝΟΙΚΙΑ-ΚΑΤΣΑΜΠΑΣ Ι","ΣΥΝΟΙΚΙΑ -ΘΕΡΙΣΣΟΣ Ι",
    "ΣΥΝΟΙΚΙΑ ΠΟΡΟΣ Ι","ΣΥΝΟΙΚΙΑ ΠΟΡΟΣ ΙΙ",
    "ΣΥΝΟΙΚΙΑ ΠΑΤΕΛΕΣ","ΣΥΝΟΙΚΙΑ ΑΓ. ΑΙΚΑΤΕΡΙΝΗΣ Ι",
    "ΣΥΝΟΙΚΙΑ ΑΓ.ΑΙΚΑΤΕΡΙΝΗΣ ΙΙ - ΤΜΗΜΑ ΠΑΤΕΛΩΝ-ΤΜΗΜΑ ΦΙΛΟΘΕΗΣ",
    "ΣΥΝΟΙΚΙΑ ΚΗΠΟΥΠΟΛΗ Ι","ΗΡΑΚΛΕΙΟ -ΑΓ.ΤΡΙΑΔΑ",
    "ΗΡΑΚΛΕΙΟ-ΠΕΡΙΟΧΗ ΛΑΚΟΣ-ΠΑΝΑΝΕΙΟ","ΣΥΝΟΙΚΙΑ ΚΗΠΟΥΠΟΛΗ ΙΙ",
    "ΗΡΑΚΛΕΙΟ EΝΤΟΣ ΤΕΙΧΩΝ-ΠΡΟΑΣΤΙΑ","ΗΡΑΚΛΕΙΟ ΣΥΝΟΙΚΙΑ ΑΤΣΑΛΕΝΙΟ Ι",
    "ΗΡΑΚΛΕΙΟ-ΣΥΝΟΙΚΙΑ ΑΤΣΑΛΕΝΙΟ ΙΙ","ΗΡΑΚΛΕΙΟ-ΣΥΝΟΙΚΙΑ ΜΑΣΤΑΜΠΑΣ",
    "ΣΥΝΟΙΚΙΑ ΑΓ. ΑΙΚΑΤΕΡΙΝΗΣ -ΕΡΓΑΤΙΚΕΣ ΚΑΤΟΙΚΙΕΣ","ΣΥΝΟΙΚΙΑ ΚΑΜΙΝΙΑ",
    "ΣΥΝΟΙΚΙΑ ΔΕΙΛΙΝΑ","ΣΥΝΟΙΚΙΑ ΘΕΡΙΣΣΟΣ ΙΙ-ΠΕΡΙΟΧΗ ΜΙΧΑΗΛ ΑΡΧΑΓΓΕΛΟΥ",
    "ΦΟΙΝΙΚΙΑ","ΣΥΝΟΙΚΙΑ ΑΓ.ΑΙΚΑΤΕΡΙΝΗΣ ΙΙΙ",
    "ΒΕΛΟΝΙ ΚΑΜΠΟΣ-ΝΕΟΣ ΚΟΣΜΟΣ-ΑΓ.ΙΩΑΝΝΗΣ ΧΩΣΤΟΣ-ΤΕΙ","ΣΥΝΟΙΚΙΑ ΑΓ. ΙΩΑΝΝΗΣ"
]


class Notifier:

    def area_list(self, areas_changed):
        if areas_changed == {}:
            pass
        else:
            self.areas_changed = areas_changed
            self.__query_subscriptions()

    def __query_subscriptions(self):
        for area, status in self.areas_changed.items():
            area_dump = area_schema.dump(Area.query.filter(Area.name == area).first())
            area_id=area_dump['id']
            subscriptions_dump = subscriptions_schema.dump(Subscription.query.filter(Subscription.area_id == area_id).all())
            for subscription in subscriptions_dump:
                user_dump = user_schema.dump(User.query.filter(User.id == subscription['user_id']).first())
                username=user_dump['username']
                notifications_preffered_mode = user_dump['notifications_preffered_mode']
                notifications_status = user_dump['notifications_status']
                if notifications_status == False:
                    pass
                elif notifications_preffered_mode == 'Email':
                    settings_dump = settings_schema.dump(Settings.query.first())
                    server_email = settings_dump['server_email']
                    server_password = settings_dump['server_password']
                    email = user_dump['email']
                    if server_email and server_password:  #check if server email and password are provided
                        if email:
                            logger.info(f"Attempting to notify via email, user {username} about area {area} status change to {status}...")
                            self.__send_email_notification(area, email, server_email, server_password, status)
                        else:
                            logger.info(f"No user email found. Skipping email notification...")
                    else:
                        logger.info(f"No server email and/or password found. Skipping email notification...")
                elif notifications_preffered_mode == 'Discord':
                    webhook = user_dump['discord_webhook']
                    logger.info(f"Attempting to notify via discord, user {username} about area {area} status change to {status}...")
                    self.__send_discord_notification(area, webhook, status)
                elif notifications_preffered_mode == 'Gotify':
                    logger.info("Notification method not implemented yet. Skipping email notification...")

    def __send_email_notification(self, area, email, server_email, server_password, status):
        if status == False:
            text = "Διακοπή διανομής νερού στην περιοχή: " + area
        else:
            text = "Επαναφορά διανομής νερού στην περιοχή: " + area
        try:
            subject = "Waterstatus Notifier"
            port = 465
            message = 'Subject: {}\n\n{}'.format(subject, text)
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
                server.login(server_email, server_password)
                server.sendmail(server_email, email, message.encode("utf-8"))
            logger.info(f"Email sent to {email} with subject: {text}")
        except Exception as e:
            logger.debug(e)
            
    def __send_discord_notification(self, area, webhook, status):
        webhook = DiscordWebhook(url=webhook)
        if status == False:
            text = "Διακοπή διανομής νερού στην περιοχή: " + area
            embed = DiscordEmbed(title='WaterStatus', description=text, color='999999')
        else:
            text = "Επαναφορά διανομής νερού στην περιοχή: " + area
            embed = DiscordEmbed(title='WaterStatus', description=text, color='999999')
        webhook.add_embed(embed)
        response = webhook.execute()



notifications = Notifier()


def scraper_thread():
    while True:
        try:
            settings_dump = settings_schema.dump(Settings.query.first())
            scraper_interval = settings_dump['web_scraper_interval'] * 60
        except: # Use this if settings table is not created yet 
            scraper_interval = 600
        areas_changed = {}
        scraper = cloudscraper.create_scraper()
        try: 
            deyah = scraper.get("https://www.deyah.gr/xartis-udreusis-hrakleiou/").text
        except: # Retry in 10 minutes if connection error occurs
            logger.info(f"Scraper Connection Error occurred. Will try again in {int(scraper_interval / 60)} minutes...")
            time.sleep(scraper_interval)
            continue
        else:
            soup = BeautifulSoup(deyah, 'html.parser')
            for i in range(50):
                polygon="polygon_" + str(i)
                rows = soup.find(id=polygon)
                try:   
                    if rows:
                        name = rows.div.h4.a.text
                        no_class = rows.find('span', class_= "no")
                        yes_class = rows.find('span', class_= "yes")
                        area = Area.query.filter_by(name=name).first()
                        try:
                            previous_status = area.logs[-1].status
                        except:
                            previous_status = None
                        if yes_class != None:
                            if previous_status == False or previous_status == None:
                                status = Log(status=True, area = area)
                                db.session.add(status)
                                areas_changed[name] = True
                        if no_class != None:
                            if previous_status == True or previous_status == None:
                                status = Log(status=False, area = area)
                                db.session.add(status)
                                areas_changed[name] = False
                        db.session.commit()
                except:
                    pass
            notifications.area_list(areas_changed)
            time.sleep(scraper_interval)



#Start scraper thread
scraper = threading.Thread(target=scraper_thread, daemon=True).start()