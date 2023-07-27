"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.addColumn("users", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("users", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("roles", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("roles", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("reports", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("reports", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("appointments", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("appointments", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("user_role_mapping", "createdAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }),
      queryInterface.addColumn("user_role_mapping", "updatedAt", {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.removeColumn("users", "createdAt"),
      queryInterface.removeColumn("users", "updatedAt"),
      queryInterface.removeColumn("roles", "createdAt"),
      queryInterface.removeColumn("roles", "updatedAt"),
      queryInterface.removeColumn("reports", "createdAt"),
      queryInterface.removeColumn("reports", "updatedAt"),
      queryInterface.removeColumn("appointments", "createdAt"),
      queryInterface.removeColumn("appointments", "updatedAt"),
      queryInterface.removeColumn("user_role_mapping", "createdAt"),
      queryInterface.removeColumn("user_role_mapping", "updatedAt"),
    ]);
  },
};
