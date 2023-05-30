import { DataTypes } from 'sequelize';

const UserModel = (sequelize)=>{
    const user = sequelize.define("user", {
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull:false,
            default:"user"
        }
    });

    return user;
}

export default UserModel;