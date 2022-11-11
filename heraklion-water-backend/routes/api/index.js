const express = require("express");
const router = require("express").Router();

// Initialize static files serving
router.use("/static", express.static("public")); // e.g http://xxxxxxxxx.xxx/static/images/xxxxxx.xxx

// Routes
router.use("/api/areas", require("./areas.routes"));

// handle all not found routes and request methods
router.use("*", function (req, res) {
  res.status(404).json({ status: "error", message: "url not found" });
});

module.exports = router;
