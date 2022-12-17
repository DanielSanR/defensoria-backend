const env = require("dotenv/config")

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.PORT_DB,
  DB: process.env.DB_NAME
};