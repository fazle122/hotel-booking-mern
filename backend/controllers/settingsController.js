import asyncHandler from "../middleware/asyncHandler.js";
import Settings from "../models/settingsModel.js";




const getSettingsData = asyncHandler(async(req,res) =>{
    // console.log('all settings data');

    const settings = await Settings.find();

    if(settings){
        res.status(200).json({settings})
    }else{
        new ErrorHandler('settings data not found',404)
    }
})


const createSettings = asyncHandler(async(req,res) =>{
    // console.log('setting data',req.body);

    const newCabin = await Settings.create(req.body);
    if(newCabin){
        res.status(201).json(newCabin);
    }else{
        new ErrorHandler('Cabin cannot be created',404)
    }
})


export {getSettingsData,createSettings}