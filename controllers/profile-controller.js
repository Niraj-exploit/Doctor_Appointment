const cloudinary = require('../utils/cloudinary')
const generateNewFileName = require('../utils/fileName')
const { User } = require('../models')
const { getUserRoles } = require('../utils/userRoles')

// Upload a photo to a subfolder
const parentFolder = process.env.FOLDER
const profile = process.env.PROFILE
const uploaded = process.env.UPLOADED
const updated = process.env.UPDATED

const profileUploadFolder = `${parentFolder}/${profile}/${uploaded}`

exports.uploadProfile = async (req, res) => {
    try {
        const roles = await getUserRoles(req.user.id)
    
        // Get the file extension from the original filename
        const fileName = req.file.originalname
        const userName = req.user.name
        const userId = req.user.id
        // Construct the new filename using the user name, user id, role, original file name, and file extension
        const newFileName = generateNewFileName(userName, userId, roles, fileName)
    
        const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: newFileName,
        folder: profileUploadFolder
        })
    
        const user = await User.findByPk(req.param.id)
        if (!user) {
        return res.json({
            success: false,
            message: 'User not found'
        })
        }
        user.profile = result.secure_url
        user.save()
        res.json({
        message: 'Profile updated successfully',
        user,
        success: true
        })
    } catch (error) {
        res.json({
        message: 'Report creation failed',
        error,
        success: false
        })
    }
}