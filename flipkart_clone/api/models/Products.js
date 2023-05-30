import { DataTypes } from "sequelize";

const productModel = (sequelize) => {
  const Product = sequelize.define("products", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
    },
  });

  return Product;
};

export default productModel;
