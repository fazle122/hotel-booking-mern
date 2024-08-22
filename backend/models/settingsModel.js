import mongoose from "mongoose";
import brcypt from 'bcryptjs';


const settingsSchema = new mongoose.Schema({
    minBookingLength:{
        type:Number,
        required:[true,"Min booking length is required"]
    },
    maxBookingLength:{
        type:Number,
        required:[true,"max booking length is required"]
    },
    maxGuestsPerCabein:{
        type:Number,
        required:[true,"max guests number is required"]
    },
    breakfastPrice:{
        type:Number,
        required:[]
    }

},{timestamps:true})




const Settings = mongoose.model("Settings",settingsSchema);
export default Settings;