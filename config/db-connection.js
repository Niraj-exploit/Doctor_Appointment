const Sequelize = require('sequelize');

const sequelize = new Sequelize('ehospital', 'root', '',{
    host: 'localhost',
    dialect:'mysql'
})

module.exports = sequelize;