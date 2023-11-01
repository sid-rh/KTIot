import { RoomService } from "@mui/icons-material";
import axios from "axios";

const API_URL='/room/';

const createRoom=async()=>{
    const response=await axios.post(API_URL+'create');

   
    console.log(response.data);

    return response.data
}

const getMyRooms=async(payload)=>
{
    const response=await axios.post(API_URL+'getMyRooms',payload);
    console.log(response.data);

    return response.data;
    
}

const assignDeviceToRoom=async(payload)=>
{
    const response=await axios.post(API_URL+'assign',payload);
    console.log(response.data);
    return response.data;
}

const roomService={
    createRoom,
    getMyRooms,
    assignDeviceToRoom,
}

export default roomService;