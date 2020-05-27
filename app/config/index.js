const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";

// Load environment variables from .env file
if (env === "development") {
  dotenv.config({ path: ".env.development" });
} else dotenv.config();

const configs = {
  base: {
    env,
    name: process.env.APP_NAME || "DialogFlow Service",
    host: process.env.APP_HOST || "0.0.0.0",
    port: 7070,
  },
  production: {
    port: process.env.APP_PORT || 8081,
  },
  development: {},
  test: {
    port: 7072,
  },
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
