const mongoose=require('mongoose');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');


dotenv.config();

const register=async(req,res)=>{
    try {

        const admin=req.currentUser.isAdmin;

        if(!admin)
        {
            return res.status(400).send("Unauthorized");
        }
        
        const{username,email,password,isAdmin}=req.body;

        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).send('User already exists');
        }

        const usernameExists=await User.findOne({username});
        if(usernameExists)
        {
            return res.status(400).send('Username is already taken');
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({username,email,password:hashedPassword,isAdmin});
        await user.save();
        if(user)
        {
            // await generateToken(res,user);
            // const token=await generateToken(user);
            res.status(201).json({ user:user});
        }

    } catch (error) {
        console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login=async(req,res)=>
{
    const { username, password }=req.body;

    try {
        const user=await User.findOne({username:username});
        // console.log(email);  
        // console.log(user);
        if(user)
        {
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(passwordMatch)
            {
                // const token=await generateToken(user);
                // console.log(token);
                await generateToken(res,user);
                // await User.updateOne({ _id: user._id },);
                res.status(200).send({user:user});
            }
            else
            {
                return res.status(400).send("Username or password is incorrect");
            }
        }
        else
        {
           return res.status(400).send("Username or password is incorrect");
        }
    } catch (error) {
        return res.send(error.message);
        
    }
}

const logout=async(req,res)=>{
    // const user=await User.findOne({_id:req.currentUserId});
    // await User.updateOne(
    //   { _id: req.currentUserId },
    //   {
    //     $set: {
    //       token: '',
    //       lastLogout: new Date(),
    //     },
    //   },
    //   { upsert: true },
    // );
    res.cookie('jwt','',{
        httpOnly:true,
        expiresIn:new Date(0),
    })

    res.status(200).send({message:"User logged out"});;
  }

const generateToken=async(res,user)=>
{
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const token= jwt.sign(
        {
          _id: user._id,
          
        //   firstname: user.firstname,
        //   lastname: user.lastname,
        //   exp: exp.getTime() / 1000,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'30d',
        },
      );
    
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    })

}

const deleteUser=(req,res)=>
{
    const isAdmin=req.currentUser.isAdmin;
    if(!isAdmin)
    {
        return res.status(400).send("Unauthorized");
    }
    const userId=req.params.id;

    User.findByIdAndDelete(userId)
        .then(result=>
            {
                res.json(result);
            })
        .catch(err=>
            {
                res.json(err);
            })
}

const getAllUsers=async(req,res)=>
{
    try {
        const users=await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={register,login,logout,deleteUser,getAllUsers};