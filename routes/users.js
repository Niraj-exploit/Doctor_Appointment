var express = require('express');
var router = express.Router();
const roleAuthentication = require('../middlewares/role-auth-middleware')

var {userRegister, userLogin, getAllUsers, getUserById, updateUserById, deleteUserById, assignUserRole, getAllUsersWithRoles} = require('../controllers/user-controller');
const { uploadProfile } = require('../controllers/profile-controller');


router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/getUsers', roleAuthentication(['ADMIN']), getAllUsers)
router.get('/getUser/:id', roleAuthentication(['ADMIN']), getUserById)
router.put('/updateUser/:id', roleAuthentication(['ADMIN']), updateUserById)
router.delete('/deleteUser/:id', roleAuthentication(['ADMIN']), deleteUserById)
router.post('/updateRole', roleAuthentication(['ADMIN']), assignUserRole)
// router.get('/getAllUsersWithRoles', roleAuthentication(['ADMIN']), getAllUsersWithRoles)



// router.patch('/uploadProfile', uploadProfile)


module.exports = router;
