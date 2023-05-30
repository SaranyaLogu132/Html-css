const dbConfiguration = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "product_data",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfiguration;
