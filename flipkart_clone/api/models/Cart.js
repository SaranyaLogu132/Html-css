import { DataTypes } from 'sequelize';

const CartModel = (sequelize)=>{
    const cart = sequelize.define("cart", {
        title:{
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.TEXT
        },
        price:{
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        userId:{
            type: DataTypes.INTEGER
        },
        productId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

    });
    return cart;
}

export default CartModel;