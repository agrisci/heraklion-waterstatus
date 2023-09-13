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
    $(".water-supply-table .water-supply-table-grid").each((i, item) => {
      if ($(".area_column", item).text() !== "") {
        names.push($(".area_column", item).text());
        if ($(".dianomi_column .yes", item).text() !== "") {
          statuses.push($(".dianomi_column .yes", item).text());
        } else if ($(".dianomi_column .no", item).text() !== "") {
          statuses.push($(".dianomi_column .no", item).text());
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

// cron.schedule("*/10 * * * *", () => {
//   const scraper = new Scraper();
//   const date = new Date().toLocaleString("el-GR", {
//     timeZone: "Europe/Athens",
//   });
//   console.log("DEYAH SCRAPER --- Running a water scraping task at: ", date);
//   scraper.scrape();
// });

const scraper = new Scraper();
const date = new Date().toLocaleString("el-GR", {
  timeZone: "Europe/Athens",
});
console.log("DEYAH SCRAPER --- Running a water scraping task at: ", date);
scraper.scrape();
