import { DataTypes, Sequelize } from "sequelize";
import dbConfiguration from "../configs/db.config.js";
const dbConfig = dbConfiguration;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .getQueryInterface()
  .addColumn("carts", "productId", { // TableName:users, column-to-add: "role"
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  .then(() => {
    console.log("New column added successfully");
  })
  .catch((error) => {
    console.error("Error adding new column:", error);
  });
