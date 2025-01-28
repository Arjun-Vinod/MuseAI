const User=require('../model/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const registerUser=async(req,res)=>{
    const {name,email,password} =req.body;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"});

        const user=new User({name,email,password});
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(201).json({user,token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

const loginUser=async(req,res)=>{
    const{email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"INvalid Credentials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({user,token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};
module.exports={registerUser,loginUser};