const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { json } = require("express");

//register user logic

const registerUser = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(404).json({message: "User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json(
            {
                token: generateToken(user),
                role: user.role
            }
        )
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//login user logic

const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(user.status ==="inactive"){
            return res.status(403).json({message: "user is inactive"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid User"});
        }
        res.json(
            {
                token: generateToken(user),
                role : user.role
            }
        );
    }catch(error){
        return res.status(500).json({message:error.message})
    }
};

module.exports = {registerUser, loginUser}