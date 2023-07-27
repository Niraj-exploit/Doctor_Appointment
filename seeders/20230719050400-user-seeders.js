"use strict";

require('dotenv').config()
const { User, Role } = require('../models')
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const hashedPassword = await bcrypt.hash(process.env.SEEDER_ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert("users", [
      {
        name: process.env.SEEDER_ADMIN_NAME,
        email: process.env.SEEDER_ADMIN_EMAIL,
        password: hashedPassword,
        address: process.env.SEEDER_ADMIN_ADDRESS,
        contact: process.env.SEEDER_ADMIN_CONTACT,
        createdAt: new Date(), 
        updatedAt: new Date(),
      },
    ],{});

    const adminUser = await User.findOne({
      where: {
        email: process.env.SEEDER_ADMIN_EMAIL,
      },
      attributes: ["id"],
    });

    await queryInterface.bulkInsert("roles", [
      {
        name: "admin",
        code: process.env.SEEDER_ADMIN_CODE,
        createdAt: new Date(), 
        updatedAt: new Date(),
      },
      {
        name: "doctor",
        code: process.env.SEEDER_DOCTOR_CODE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "patient",
        code: process.env.SEEDER_PATIENT_CODE,
        createdAt: new Date(), 
        updatedAt: new Date(),
      },
    ],{});

    const adminRole = await Role.findOne({
      where: {
        code: process.env.SEEDER_ADMIN_CODE,
      },
      attributes: ["id"],
    }); 

    await queryInterface.bulkInsert("user_role_mapping", [
      {
        user_id: adminUser.id,
        role_id: adminRole.id,
        createdAt: new Date(), 
        updatedAt: new Date(),
      },
    ],{});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("user_role_mapping", null, {});
  },
};
