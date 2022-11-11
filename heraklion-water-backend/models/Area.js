const mongoose = require("mongoose");

const Area = mongoose.model(
  "Area",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      coordinates: {
        type: Array,
        required: false,
      },
      log: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Log",
        },
      ],
    },
    { versionKey: false }
  )
);

module.exports = Area;
