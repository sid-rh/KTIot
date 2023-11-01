import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import deviceReducer from '../features/device/deviceSlice';
import roomReducer from '../features/room/roomSlice';


const store=configureStore({
    reducer:{
        auth:authReducer,
        device:deviceReducer,
        room:roomReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
    devTools:true,
});

export default store;