const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const { Area, Log } = require("../models");
const { sendPushNotification } = require("../services/pushNotifications");
const { findAreaByName } = require("../data/areaPolygons");

class Scraper {
  async scrape() {
    const url = "https://www.deyah.gr/xartis-udreusis-hrakleiou/";
    const { data } = await axios.get(url);
    const $ = await cheerio.load(data);
    let names = [];
    let statuses = [];
    $(".water-supply-table .row").each((i, item) => {
      if ($(".col-sm-3 a", item).text() !== "") {
        names.push($(".col-sm-3 a", item).text());
        if ($(".col-sm-2 .yes", item).text() !== "") {
          statuses.push($(".col-sm-2 .yes", item).text());
        } else if ($(".col-sm-2 .no", item).text() !== "") {
          statuses.push($(".col-sm-2 .no", item).text());
        }
      }
    });
    names.forEach((name, i) => {
      this.logArea(name, statuses[i]);
    });
  }

  async logArea(name, status) {
    let area = await Area.findOne({ name: name })
      .populate({
        path: "log",
        options: { sort: { datetime: -1 }, limit: 1 },
      })
      .exec();
    // Initialize areas and logs collections (add new area, log)
    if (area === null) {
      const log = new Log({
        status: status,
      });
      const area = new Area({
        name: name,
        coordinates: findAreaByName(name),
        log: log._id,
      });
      await area.save();
      await log.save();
    }
    // Log area status if it has changed
    else if (area.log[0].status !== status) {
      const log = new Log({
        status: status,
      });
      await log.save();
      await Area.findOneAndUpdate({ name: name }, { $push: { log: log._id } });
      //send push notifications to subscribed devices
      console.log(
        `SCRAPER --- Sending push notifications for the area: ${name}`
      );
      sendPushNotification(area._id.toString(), status);
    }
  }
}

cron.schedule("*/10 * * * *", () => {
  const scraper = new Scraper();
  const date = new Date().toLocaleString("el-GR", {
    timeZone: "Europe/Athens",
  });
  console.log("DEYAH SCRAPER --- Running a water scraping task at: ", date);
  scraper.scrape();
});
