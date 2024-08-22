import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cabinRoutes from './routes/cabinRoute.js'
import bookingRoutes from './routes/bookingRoute.js'
import userRoutes from './routes/userRoute.js'
import settingsRoutes from './routes/settingsRoute.js'
import cookieParser   from 'cookie-parser';


dotenv.config({path:"backend/.env"});
// dotenv.config({path:".env"});
const port = process.env.PORT || 3000;



connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


// import asyncHandler from "./middleware/asyncHandler.js";
// app.use('/api/cabins/test', asyncHandler(async(req,res) =>{
//     console.log('ok ok');
//     const testArray = ['cabin1','cabin2','cabin3'];
//     res.status(200).json({data:testArray});
// }));

app.use('/api/cabins',cabinRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/users',userRoutes);
app.use('/api/settings',settingsRoutes);

const server = app.listen(port, () =>{
    console.log(`server is running ${port} in ${process.env.NODE_ENV} mode`)
})