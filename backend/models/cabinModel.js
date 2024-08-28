import mongoose from "mongoose";


const cabinSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    images:[{
        imageId:String,
        url:String
    }],
    capacity:{
        type:Number,
        required:[true,'capacity is required']
    },
    regularPrice:{
        type:Number,
        required:[true,'regularPrice is required']
    },
    discount:{
        type:Number,
        default:0,
    },
    bookingCount:{
        type:Number
    }

},{timestamps:true})


const Cabin = mongoose.model('Cabin',cabinSchema);
export default Cabin;