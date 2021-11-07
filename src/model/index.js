("use strict");
require("dotenv").config();

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");
let sequelizeOptions =
  process.env.NODE_ENV === "production" //if it in huroko put this is
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const Users = require("./Users");

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
module.exports = {
  db: sequelize,
  Users: Users(sequelize, DataTypes),
};
