const { DataTypes } = require('sequelize')
const sequelize = require('../config/db-connection')
const { beautifyTimestamp } = require('../utils/moment');
const User = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact: {
        type:DataTypes.STRING,
        allowNull:false
    },
    profile: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: "https://asset.cloudinary.com/dkiemrxdf/b2787b3d48456fc8a4e5d986b7ed1f69"

    },
})

module.exports = User;