import asyncHandler from "../middleware/asyncHandler.js";
import SSLCommerzPayment from "sslcommerz-lts";
import Booking from "../models/bookingModel.js";



// http://localhost:5173/profile
// http://localhost:5173/profile
// http://localhost:5173/dashboard
// http://localhost:5173/

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASS
const is_live = false //true for live, false for sandbox


const getPaymet = asyncHandler(async(req,res) => {
    console.log('payment');

    console.log(req.body.bookingId);
    const tranId = `tran-${req.body.bookingId}`;

    const bookingData = await Booking.findById(req.body.bookingId).populate('user','name email').populate('cabin','name');
    // console.log(bookingData);
    const paymentData = {
        total_amount: bookingData?.totalPrice,
        currency: 'BDT',
        tran_id: tranId, // use unique tran_id for each api call
        success_url: `http://localhost:8000/api/bookings/success/${tranId}`,
        fail_url: `http://localhost:8000/api/bookings/fail`,
        cancel_url: 'http://localhost:5173/dashboard',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: bookingData?.cabin?.name,
        product_category: 'Service',
        product_profile: 'general',
        cus_name: bookingData?.user?.name,
        cus_email: bookingData?.user?.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // console.log(paymentData);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(paymentData).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        res.send({url:GatewayPageURL});
        console.log('Redirecting to: ', GatewayPageURL)
    });

    // res.status(200).json({msg:paymentData})

})

async function name(params) {
    
}




export {getPaymet}