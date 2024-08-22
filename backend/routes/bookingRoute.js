import express from 'express';
import {protect,adminProtect} from '../middleware/authMiddleware.js'
import { createBooking, deleteBookingData, editBooking, fetchAllBookings, fetchBookingDetail, getBookedDatesByCabin } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/').get(protect,fetchAllBookings);
router.route('/new').post(protect,createBooking);
router.route('/dates/:id').get(getBookedDatesByCabin)
router.route('/:id').get(protect,fetchBookingDetail).put(protect,editBooking).delete(protect,deleteBookingData);


export default router;