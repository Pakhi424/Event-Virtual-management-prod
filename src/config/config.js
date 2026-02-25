require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "supersecretkey"
};
