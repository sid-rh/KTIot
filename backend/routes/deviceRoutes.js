const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const{createDevice,assignDevice,getAllDevices,toggleDevice}=require('../controller/deviceController');

router.post('/create',auth,createDevice);
router.post('/assign',auth,assignDevice);
router.post('/getAll',auth,getAllDevices);
router.post('/toggle',auth,toggleDevice);


module.exports = router;