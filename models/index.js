const { sequelize } = require("../config/database");

const db = {};

db.Sequelize = require("sequelize");
db.sequelize = sequelize;

db.User = require("./user")(sequelize, db.Sequelize);

module.exports = db;
