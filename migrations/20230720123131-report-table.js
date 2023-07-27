'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('reports',{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
        },
      description: {
        allowNull: false,
        type: DataTypes.STRING
        },
        report:{
          allowNull: false,
          type: DataTypes.STRING
        },
        patientId:{
          allowNull: false,
          type: DataTypes.INTEGER
        },
        updatedBy:{
          defaultValue: null,
          allowNull:true,
          type: DataTypes.INTEGER
        }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('reports');
  }
};
