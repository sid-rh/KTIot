import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./roomService";


const initialState={
    room:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

export const getMyRooms=createAsyncThunk('room/getMyRooms',async(payload,thunkApi)=>{
    try {
        return await roomService.getMyRooms();
    } catch (error) {
        console.log(error);
    }
});

export const createRoom=createAsyncThunk('device/createRoom',async(payload,thunkApi)=>{
    try {
        return await roomService.createRoom(payload);
    } catch (error) {
        console.log(error);
    }
});

export const assignDeviceToRoom=createAsyncThunk('device/assignDeviceToRoom',async(payload,thunkApi)=>
{
    try {
        return await roomService.assignDeviceToRoom(payload);
    } catch (error) {
        console.log(error);
    }
})

export const roomSlice=createSlice({
    name:'room',
    initialState,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(getMyRooms.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getMyRooms.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.room=action.payload
            
        })
        .addCase(getMyRooms.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.room=null
            
        })
            
    }
})




export default roomSlice.reducer;