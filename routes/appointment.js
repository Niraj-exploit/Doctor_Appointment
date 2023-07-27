const express= require('express')
const { createAppointment, viewAppointment, viewAllAppointments, confirmAppointment, cancelAppointment, rejectAppointment, deleteAppointment } = require('../controllers/appointment-controller')
const roleAuthentication = require('../middlewares/role-auth-middleware')
const router= express.Router()

router.post('/createAppointment/:id', roleAuthentication(['PATIENT']), createAppointment)
router.get('/viewAppointment/:id', roleAuthentication(['DOCTOR', 'ADMIN']), viewAppointment)
router.get('/viewAllAppointment', roleAuthentication(['DOCTOR', 'ADMIN']), viewAllAppointments)
router.patch('/confirmAppointment/:id', roleAuthentication(['DOCTOR', 'ADMIN']), confirmAppointment)
router.patch('/cancelAppointment/:id', roleAuthentication(['DOCTOR', 'ADMIN']), cancelAppointment)
router.patch('/rejectAppointment/:id', roleAuthentication(['ADMIN']), rejectAppointment)
router.delete('/deleteAppointment/:id', roleAuthentication(['ADMIN']), deleteAppointment)

module.exports = router