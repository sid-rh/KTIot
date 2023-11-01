import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deviceService from "./deviceService";


const initialState={
    device:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

export const getAllDevices=createAsyncThunk('device/getAllDevices',async(payload,thunkApi)=>{
    try {
        return await deviceService.getAllDevices();
    } catch (error) {
        console.log(error);
    }
});

export const createDevice=createAsyncThunk('device/createDevice',async(payload,thunkApi)=>{
    try {
        return await deviceService.createDevice();
    } catch (error) {
        console.log(error);
    }
});

export const assignDevice=createAsyncThunk('device/assignDevice',async(payload,thunkApi)=>
{
    try {
        return await deviceService.assignDevice(payload);
    } catch (error) {
        console.log(error);
    }
})

export const deviceSlice=createSlice({
    name:'device',
    initialState,
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(getAllDevices.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllDevices.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.device=action.payload
            
        })
        .addCase(getAllDevices.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.device=null
            
        })
            
    }
})




export default deviceSlice.reducer;