const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/userRoutes');
const deviceRoutes=require('./routes/deviceRoutes');
const roomRoutes=require('./routes/roomRoutes');


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(
        ()=>{
            console.log("Connected to db");
        }
    );

    app.use('/user',userRoutes);
    app.use('/device',deviceRoutes);
    app.use('/room',roomRoutes);

    app.listen(8000,()=>
    {
        console.log('listening');
    });