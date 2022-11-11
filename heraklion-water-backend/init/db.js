const config = require("../config");
const mongoose = require("mongoose");

// Connect to the database
mongoose
  .connect(`mongodb://${config.db.ip}:${config.db.port}/${config.db.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("DATABASE --- Successfully connected to MongoDB."))
  .catch((err) =>
    console.error("DATABASE ERROR --- Error connecting to MongoDB - ", err)
  );
