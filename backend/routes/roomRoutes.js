const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');

const{createRoom,assignDevicetoRoom,getAllRooms,getMyRooms}=require('../controller/roomController');

router.post('/create',auth,createRoom);
router.post('/assign',auth,assignDevicetoRoom);
router.post('/getAll',auth,getAllRooms);
router.post('/getMyRooms',auth,getMyRooms);


module.exports = router;