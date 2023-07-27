const { DataTypes } = require('sequelize')
const sequelize = require('../config/db-connection')
const { beautifyTimestamp } = require('../utils/moment');

const Report = sequelize.define('reports',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    report:{
        type:DataTypes.STRING,
        allowNull:false
    },
    patientId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    updatedBy:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        allowNull:true
    },
    description:{
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

module.exports = Report;