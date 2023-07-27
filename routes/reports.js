const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const roleAuthentication = require('../middlewares/role-auth-middleware')
const { viewReport, uploadReport, deleteReport, updateReport, getAllReports } = require('../controllers/report-controller')


router.get('/view_report/:id', viewReport) 
router.get('/viewAllReport', getAllReports)
router.post('/upload_report',multer.single('report'), uploadReport)
router.put('/update_report/:id',multer.single('report'), updateReport)
router.delete('/delete_report/:id', roleAuthentication(['DOCTOR', 'ADMIN']), deleteReport)

module.exports = router