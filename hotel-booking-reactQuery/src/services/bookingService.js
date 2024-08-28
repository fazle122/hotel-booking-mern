import axios from "axios"



async function fetchAllBookings({filters}){
    console.log(filters);
    // const statusParams = filters.map((filter) => filter?.key == 'status' ? filter?.value : undefined);
    // console.log(statusParams);
    // const guestCountParams = filters.map((filter) => filter?.key == 'numOfGuests' ? filter?.value : undefined);
    // console.log(guestCountParams);

    const url = `/api/bookings` ;

    try{
        const data = await axios({
            method:'get',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            // params:{
            //     status:statusParams,
            //     numOfGuests:guestCountParams
            // }
            params: filters
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}




async function fetchBookingDetal(id){
    const url = `/api/bookings/${id}` 
    // console.log(id);

    try{
        const data = await axios({
            method:'get',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
        });
        // console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


async function fetchBookedDates(id) {
    var url = `/api/bookings/dates/${id}`;
    try{
        const data = await axios({
            method:'get',
            url,
            headers:{
                'Content-Type':'application/json'
            }
        });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
        throw new Error(error);

    }
}


async function createBooking(bookingData){
    const url = `/api/bookings/new`
    try{
        const data = await axios({
            method:'post',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:bookingData
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


async function updateBookingData(id,bookingData){
    const url = `/api/bookings/${id}` 
    console.log(bookingData)
    console.log(id)

    try{
        const data = await axios({
            method:'put',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:bookingData
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


async function deleteBookingData(id,cabinId){
    const url = `/api/bookings/${id}` 
    console.log(cabinId);
    try{
        const data = await axios({
            method:'delete',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:cabinId
            // params:cabinId
        });
        // console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


async function createPayment(paymentData) {
    const url = `/api/payment/getPayment` 
    console.log(paymentData);

    try{
        const response = await axios({
            method:'post',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:paymentData
        });
        console.log(response);
        return response;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
    
}



export {fetchAllBookings,fetchBookingDetal,fetchBookedDates,createBooking,updateBookingData,createPayment,deleteBookingData};















  