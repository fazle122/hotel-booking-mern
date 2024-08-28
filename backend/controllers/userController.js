import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import {ErrorHandler} from "../utils/errorHandlers.js";
import generateToken from "../utils/generateToken.js";




const loginUser = asyncHandler(async(req,res) =>{
    console.log('login user');

    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user &&  (await user.matchPassword(password))){
        generateToken(res,user._id);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        throw new ErrorHandler("loginUser","Invalid email or password",401)
    }

})

const logoutUser = asyncHandler(async(req,res,next) =>{
    res.cookie('hm-jwt','',{httpOnly:true,expires:new Date(0)});
    res.status(200).json({message:'logged out succesfully '})
    
})

const getAllUsers = asyncHandler(async(req,res) =>{
    console.log('all users');

    const users = await User.find();

    if(users){
        res.status(200).json({users,length:users.length})
    }else{
        new ErrorHandler('Users not found',404)
    }
})




const registerUser = asyncHandler(async(req,res) =>{
    console.log('create user');
    const {name,email,password,isAdmin} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) {
        // res.status(400);
        // throw new Error("user already exists");
        res.status(400).json({message:"user already exists"})

    }
    const user = await User.create({name,email,password,isAdmin});

    if(user){
        generateToken(res,user._id);
        const newUser = {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin

        }
        res.status(201).json(newUser);
    }else{
        // new ErrorHandler('User cannot be created',404)
        res.status(404).json({message:"User cannot be created"})
    }
})


const getUserProfile = asyncHandler(async(req,res) =>{
    // console.log(req.user);
    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");

    if(userData){
        res.status(201).json(userData);
    }else{
        res.status(404).json({message:"User data not found"})
    }
})

const editProfile = asyncHandler(async(req,res) =>{
    // console.log(req.user);
    const userId = req.user.id;
    const userData = await User.findById(userId);

    if(userData){
        try{
            // const editResponse = await User.findByIdAndUpdate(userId,req.body);
            userData.name = req.body.name;
            const editResponse = await userData.save()

            res.status(200).json({message:'user updated',data:editResponse})
        }catch(err){
            console.log(err);
            res.status(404).json({message:err});
        }
    }else{
        res.status(404).json({message:'user not found'});
    }
  
})


const editPassword = asyncHandler(async(req,res) =>{

    console.log('edit password');
    const email = req.user.email;

    const {oldPassword,password} = req.body;
    const user = await User.findOne({email});

    if(user &&  (await user.matchPassword(oldPassword))){
        user.password = password;
        const response = user.save();
        res.status(201).json({message:"password updated successfully",data:response});
    }else{
        res.status(401).json({message:"password did not matched"})
    }
  
})



export {loginUser,logoutUser,getAllUsers,registerUser,getUserProfile,editProfile,editPassword};