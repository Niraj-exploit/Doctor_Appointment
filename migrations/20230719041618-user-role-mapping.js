"use strict";

const { DataTypes } = require("sequelize");
const { User, Role } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_role_mapping", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User.tableName, // Assuming User.tableName holds the actual table name for the User model
          key: "id", // Assuming "id" is the primary key column in the User table
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Role.tableName, // Assuming Role.tableName holds the actual table name for the Role model
          key: "id", // Assuming "id" is the primary key column in the Role table
        },
      },
    });

    await queryInterface.addConstraint("user_role_mapping", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_user_role_mapping_user_id",
      references: {
        table: User.tableName, // Assuming User.tableName holds the actual table name for the User model
        field: "id", // Assuming "id" is the primary key column in the User table
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("user_role_mapping", {
      fields: ["role_id"],
      type: "foreign key",
      name: "fk_user_role_mapping_role_id",
      references: {
        table: Role.tableName, // Assuming Role.tableName holds the actual table name for the Role model
        field: "id", // Assuming "id" is the primary key column in the Role table
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_role_mapping");
  },
};
