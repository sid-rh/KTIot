const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const {register,login,logout,deleteUser,getAllUsers} = require('../controller/userController');

router.post('/register',auth, register);
router.post('/login',login);
router.post('/delete',auth,deleteUser);
router.post('/getAll',getAllUsers);
router.post(
    '/logout',
    auth,
    logout);

module.exports = router;