import axios from "axios";

const API_URL='/device/';

const createDevice=async()=>{
    const response=await axios.post(API_URL+'create');

    if(response.data)
    {
        localStorage.setItem('users',JSON.stringify(response.data))
    }
    console.log(response.data);

    return response.data
}

const getAllDevices=async()=>
{
    const response=await axios.post(API_URL+'getAll');
    console.log(response.data);

    return response.data;
    
}

const assignDevice=async(payload)=>
{
    const response=await axios.post(API_URL+'assign',payload);
    console.log(response.data);
    return response.data;
}

const deviceService={
    createDevice,
    getAllDevices,
    assignDevice,
}

export default deviceService;