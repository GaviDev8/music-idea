require("dotenv").config();
const Sequelize = require("sequelize");

// For online (render)
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  // For Local Machine
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        port: process.env.DB_PORT,
        logging: false,
      }
    );

module.exports = sequelize;