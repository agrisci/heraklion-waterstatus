const env = process.env.NODE_ENV || "prod"; // 'dev' or 'prod'

// if enviroment variable is prod load variables from local .env file
env === "dev" ? require("dotenv").config() : null;

const dev = {
  app: {
    port: process.env.HOST_PORT,
  },
  db: {
    ip: process.env.DATABASE_IP,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
  },
};

const prod = {
  app: {
    port: process.env.HOST_PORT,
  },
  db: {
    ip: process.env.DATABASE_IP,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
  },
};

const config = {
  dev,
  prod,
};

console.log(
  `[APPLICATION RUNTIME INFO] --- ${
    env === "prod" ? "Production mode" : "Development mode"
  }`
);

module.exports = config[env];
