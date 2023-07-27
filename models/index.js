const User = require('./user-table')
const Role = require('./role-table')
const Report = require('./report-table')
const Appointment = require('./appointment-table')
const UserRoleMapping = require('./user-role-mapping')  
const sequelize = require('../config/db-connection')

const ConnectToDatabase = async (req,res)=>{
  await sequelize.authenticate()
}

module.exports = { User, Role, UserRoleMapping, Report, Appointment, ConnectToDatabase }