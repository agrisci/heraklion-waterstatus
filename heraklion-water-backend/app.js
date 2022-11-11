const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");
const cors = require("cors");

// Init App
const app = express();

// Init Modules
require("./init/db");
require("./init/scraper");

// Initialize JSON Requests Parser
app.use(express.json());

// Optimize necessary middlewares depending process mode
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
}

app.use(helmet());
app.use(cors());

// Enable Routes
app.use("/", require("./routes/api"));

// Initialize http server
http.createServer(app).listen(config.app.port);
