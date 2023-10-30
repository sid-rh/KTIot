const express = require('express');
const mongoose=require('mongoose');
const Device = require('../models/device'); 
const Room = require('../models/room');
const User=require('../models/user');

const createRoom=async(req,res)=>
{
    try {
        const {name}=req.body;
        const userId=req.currentUser._id;
        const room=new Room({user_id:userId,room_name:name});
        const savedRoom= await room.save();
        await User.updateOne({_id:userId},{$push:{rooms:savedRoom._id}});
        res.status(200).json(savedRoom);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const assignDevicetoRoom=async(req,res)=>
{
    try {
        const{roomId,deviceId}=req.body;
        const userId=req.currentUser._id;
        const room=await Room.findById(roomId);
        if(!room) return res.status(404).json({message: 'Room not found'});
        if(!room.user_id.equals(userId)) return res.status(404).json({message:'Unauthorized to use this room'});
        const device=await Device.findById(deviceId);
        if(!device) return res.status(404).json({message:'Device does not exist'});
        if(!device.alloted_to_user.equals(userId)) return res.status(404).json({message:'Unauthorized to use this device'});

        await Room.updateOne({_id:roomId},{device_id:deviceId});
        
        const updatedRoom=await Room.findById(roomId);
        res.status(200).json(updatedRoom);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllRooms=async(req,res)=>
{
    // if(!req.currentUser.isAdmin) return res.status(400).send("Unauthorized");

    try {
        const rooms=await Room.aggregate([
            {
                $lookup: {
                  from: 'devices',
                  localField: 'device_id',
                  foreignField: '_id',
                  as: 'device', 
                  
                },
              },
              {
                $lookup: {
                  from: 'users', 
                  localField: 'user_id',
                  foreignField: '_id',
                  
                  as: 'user', 
                },
              },
              {
                $project:{"user._id":0,"user.password":0,"user.alloted_devices":0,"user.rooms":0,"user.isAdmin":0}
              }
        ]);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMyRooms=async(req,res)=>
{
    try {
        const userId=req.currentUser._id;
        const rooms=await Room.aggregate([
            {
                $match:{
                    'user_id':new mongoose.Types.ObjectId(userId),
                }
            },
            {
                $lookup: {
                  from: 'devices', // The name of the User collection
                  localField: 'device_id',
                  foreignField: '_id',
                  as: 'device', // The name of the field to populate with the user document
                },
              },
        ]);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={createRoom,assignDevicetoRoom,getAllRooms,getMyRooms};
