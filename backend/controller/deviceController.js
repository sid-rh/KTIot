const express = require('express');
const Device = require('../models/device'); 
const Room = require('../models/room');
const User=require('../models/user');
const mongoose=require('mongoose');


const createDevice=async(req,res)=>
{
    if(!req.currentUser.isAdmin) return res.status(400).send("Unauthorized");
    try {
        const device=new Device();
        const createdDevice=await device.save();
        res.status(200).send(createdDevice);
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
}

const assignDevice=async(req,res)=>
{
    if(!req.currentUser.isAdmin) return res.status(400).send("Unauthorized");

    try 
    {
        const { deviceId, username } = req.body; 
        const device = await Device.findById(deviceId);
        const user=await User.find({username:username});
        if(!user) return res.status(404).json({ message: 'User not found' });
        const userId=user[0]._id;
    

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        if(!user)
        {
            return res.status(404).json({message:'User not found'});
        }

        // user.alloted_devices=deviceId;
        // device.alloted_to_user = userId;
        await Device.updateOne({_id:deviceId},{alloted_to_user:userId});
        await User.updateOne({_id:userId},{$push:{alloted_devices:deviceId}});
        const updatedDevice = await Device.findById(deviceId);
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllDevices=async(req,res)=>
{
    if(!req.currentUser.isAdmin) return res.status(400).send("Unauthorized");

    try {
        const devices=await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const toggleDevice=async(req,res)=>
{
    try {
        const {roomId,loadType}=req.body;
        const userId=req.currentUser._id;
        const room=await Room.findById(roomId);

        if(!room) return res.status(404).json({ message: 'Room not found' });
        

        if(!room.user_id.equals(userId))
        {
            return res.status(404).json({message:'Unauthorized to use this room'});
        }
        const deviceId=room.device_id;
        if(deviceId==null)
        {
            return res.status(400).json({message:'No device has been assigned to the room'});
        }

        const device=await Device.findById(deviceId);

        if(!device)  return res.status(400).json({message:'Device does not exist'});

        if (loadType in device.state) {
            
            const newState=!device.state[loadType];
            await Device.updateOne({_id:deviceId},{$set:{[`state.${loadType}`]:newState}},{new:true});
            const updatedDevice = await Device.findById(deviceId);
            res.status(200).json(updatedDevice);
          } else {
            res.status(400).json({ message: 'Invalid load type' });
          }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports={createDevice,assignDevice,getAllDevices,toggleDevice};