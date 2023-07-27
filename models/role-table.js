const { DataTypes } = require('sequelize')
const sequelize = require('../config/db-connection')
const { beautifyTimestamp } = require('../utils/moment');

const Role = sequelize.define('roles',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        get() {
          return beautifyTimestamp(this.getDataValue('createdAt'));
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        get() {
          return beautifyTimestamp(this.getDataValue('updatedAt'));
        },
      },

})

module.exports = Role;