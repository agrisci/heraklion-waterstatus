const mongoose = require("mongoose");

const Log = mongoose.model(
  "Log",
  mongoose.Schema(
    {
      status: {
        type: String,
        required: true,
      },
      datetime: {
        type: Date,
        default: Date.now,
      },
    },
    { versionKey: false }
  )
);

module.exports = Log;
