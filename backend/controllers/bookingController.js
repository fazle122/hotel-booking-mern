import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../models/bookingModel.js";
import Cabin from "../models/cabinModel.js";
import ApiFilters from "../utils/apiFilters.js";
import {Types} from "mongoose";





const fetchAllBookings = asyncHandler(async(req,res) =>{

    console.log('fetch bookings')
    console.log('req.query',req.query);

    const pageSize = req.query.startDate? 50:4;
    const page = Number(req.query.pageNo || 1);

    const apiFIlters = new ApiFilters(Booking,req.query,req.user,true).search().filter().sort();
    let bookings = await apiFIlters.query;
    let count = bookings.length;

    if(bookings){
        apiFIlters.pagination(pageSize);
        bookings = await apiFIlters.query.clone();
        res.json({bookings,count,page,pages:Math.ceil(count/pageSize)});
    }

    // const bookings = await Booking.find().populate('user','name email').populate('cabin','name');

    // if(bookings){
    //     res.status(200).json({
    //         bookings,length:bookings.length
    //     })
    // }
    else{
        new ErrorHandler('Bookings not found',404)
    }
})


const fetchBookingDetail = asyncHandler(async(req,res) =>{

    console.log('fetch booking detail')
    const booking = await Booking.findById(req.params.id).populate('user','name email').populate('cabin','name price discount');

    if(booking){
        res.status(200).json({message:'success',data:booking})
    }else{
        // new ErrorHandler('cabin not found',404)
        res.status(404);
        throw new Error('booking not found');
    }
})

const getBookedDatesByCabin = asyncHandler(async(req,res) => {

    console.log('fetch booked dates');

    const cabinId =  new Types.ObjectId(req.params.id);
    const data = await Booking.find({cabin:  cabinId}).select('startDate endDate')
    res.status(200).json({data:data})
})

const createBooking = asyncHandler(async(req,res) =>{

    console.log('create booking')
    console.log('booking data',req.body.cabin._id);

    const newBooking = await Booking.create(req.body);
    if(newBooking){

        const cabin = await Cabin.findById(req.body.cabin._id);
        const bookingCount = cabin?.bookingCount || 0;
        if(cabin){
            cabin.bookingCount = bookingCount + 1;
            await cabin.save()
        }

        res.status(201).json(newBooking);
    }else{
        new ErrorHandler('booking cannot be created',404)
    }
})

const editBooking = asyncHandler(async(req,res) => {
    console.log('edit booking');
    console.log(req.body)

    // const {status,isPaid} = req.body;
    const booking = await Booking.findById(req.params.id);
    if(booking){
        try{
            // if(booking){
            //     booking.status = status;
            //     booking.isPaid = isPaid
            // }
            // console.log(booking);
            // const editResponse = await booking.save()
            const editResponse = await Booking.findByIdAndUpdate(req.params.id,req.body);
            res.status(200).json({message:'Booking updated',data:editResponse})
        }catch(err){
            console.log(err);
            res.status(404).json({message:err});
        }
    }else{
        res.status(404).json({message:'booking data not found'});
  
    }

})

const confirmBooking = asyncHandler(async(req,res) => {
    console.log('confirm booking');
    console.log(req.params.tranId)

    const id = req.params.tranId.split('-')[1];
    console.log(id);
    const booking = await Booking.findOne({_id:id});
    if(booking){
        try{
            if(booking){
                booking.tranId = req.params.tranId;
                booking.isPaid = true;
            }
            console.log(booking);
            const editResponse = await booking.save()
            // res.status(200).json({message:'Booking updated',data:editResponse})
            res.redirect(`http://localhost:5173/success/${req.params.tranId}`)
        }catch(err){
            console.log(err);
            res.status(404).json({message:err});
        }
    }else{
        res.status(404).json({message:'booking data not found'});
  
    }

})

const failBooking = asyncHandler(async(req,res) => {
    console.log('confirm booking');
    console.log(req.params.tranId);
    res.redirect(`http://localhost:5173/fail`)


    // const id = req.params.tranId.split('-')[1];
    // console.log(id);
    // const booking = await Booking.findOne({_id:id});
    // if(booking){
    //     try{
    //         if(booking){
    //             booking.tranId = req.params.tranId;
    //             booking.isPaid = true;
    //         }
    //         console.log(booking);
    //         const editResponse = await booking.save()
    //         // res.status(200).json({message:'Booking updated',data:editResponse})
    //         res.redirect(`http://localhost:5173/success/${req.params.tranId}`)
    //     }catch(err){
    //         console.log(err);
    //         res.status(404).json({message:err});
    //     }
    // }else{
    //     res.status(404).json({message:'booking data not found'});
  
    // }

})



const deleteBookingData = asyncHandler(async(req,res) =>{

    console.log('delete booking')
    console.log(req.body.cabinId);
    const booking = await Booking.findById(req.params.id);
    if(booking){
        try{
            const deleteResponse = await Booking.deleteOne({_id:booking._id});

            const cabin = await Cabin.findById(req.body.cabinId);
            const bookingCount = cabin.bookingCount;
            if(bookingCount){
                cabin.bookingCount = bookingCount - 1;
                await cabin.save()
            }
            res.status(200).json({message:'booking deleted'})
        }catch(err){
            // res.status(404);
            // throw new Error(err);
            res.status(404).json({message:'booking data can not be deleted'});
        }
    }else{
        res.status(404).json({message:'booking data not found'});
        // return next(new ErrorHandler("Cabin data not found", 404)); 
    }
})



export {fetchAllBookings,fetchBookingDetail,getBookedDatesByCabin,createBooking,editBooking,confirmBooking,failBooking,deleteBookingData}