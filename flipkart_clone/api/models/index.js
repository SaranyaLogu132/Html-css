import dbConfiguration from "../configs/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import productModel from "./Products.js";
import UserModel from "./User.js";
import CartModel from "./Cart.js";
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
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = productModel(sequelize, DataTypes);
db.user = UserModel(sequelize, DataTypes);
db.cart = CartModel(sequelize, DataTypes);
sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});


export default db;
