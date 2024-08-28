import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    startDate:{
        type:Date,
        required:[true,'start date is required']
    },
    endDate:{
        type:Date,
        required:[true,'end date is required']
    },
    numOfNights:{
        type:Number,
        required:[true,'no of nights date is required']
    },
    numOfGuests:{
        type:Number,
        required:[true,'no of guests date is required']
    },
    cabinPrice:{
        type:Number,
        required:[true,'cabin price is required']
    },
    extraPrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        required:[true,'total price is required']
    },
    status:{
        type:String,
        required:[true,'status is required']
    },
    hasBreakfast:{
        type:Boolean,
        required:[true,'IsBreakfast included is required']
    },
    isPaid:{
        type:Boolean,
        required:[true,'IsPaid is required']
    },
    tranId:{
        type:String
    },
    observations:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cabin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cabin',
        required:true
    }




},{timestamps:true});


const Booking = mongoose.model("Booking",bookingSchema);
export default Booking; 