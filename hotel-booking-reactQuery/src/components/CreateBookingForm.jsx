/* eslint-disable react/prop-types */
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { useCreateBooking } from "../features/bookings/useBooking";
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';




export default function CreateBookingForm({cabin,user}){
    // const {user} = getLoggedInUser();
    const {register,handleSubmit,formState:{errors}} = useForm()
    // const {mutate:reserve,isPending} = useCreateBooking();
    const {isPending} = useCreateBooking();

    // const {range,resetRange} = useReservation();
    const {range} = useReservation();
    const {regularPrice,discount} = cabin;
    const startDate =  range.from;
    const endDate = range.to;
    const numOfNights = differenceInDays(endDate,startDate);
    const cabinPrice = numOfNights * (regularPrice - discount); 

    const navigate = useNavigate();

    function createBooking(data){
        console.log(data['numOfGuests']);

        const reservationData ={
            startDate,
            endDate,
            numOfNights,
            numOfGuests:data['numOfGuests'],
            cabinPrice,
            totalPrice:cabinPrice,
            status:'booked',
            hasBreakfast:false,
            isPaid:false,
            user:user,
            cabin:cabin
            // user:user._id,
            // cabin:cabin._id
        }

        console.log(reservationData);
        ////// navigate('/login?redirect=/confirmBooking',{state:reservationData});
        if(!user){
            navigate(`/login?redirect=/rooms/${cabin._id}`);
        }else{
            navigate('/confirmBooking',{state:reservationData});
        }
        // navigate(`/login?redirect=/rooms/${cabin._id}`);

        // reserve(reservationData);
        // resetRange()
    }


    const guestCountOptions = [
        { value: 1, label: 'one' },
        { value: 2, label: 'two'},
        { value: 3, label: 'three' },
        { value: 4, label: 'four' },
      ]

    return (
        <div>
            <form className="space-y-6" onSubmit={handleSubmit(createBooking)}>
                <div className="space-y-2">
                    <label>Number of guests: </label>
                    <select 
                        name='numOfGuests'
                        className="border rounded  px-4 py-2 w-72" 
                        {...register('numOfGuests',{required:"number of guests is required"})}
                    >
                        {guestCountOptions.map((cap) => <option disabled={cap.value > cabin.capacity} key={cap.value} value={cap.value}>{cap.label}</option>)}
                    </select>
                    {errors?.numOfGuests?.message && <p className='text-red-600'>{errors.numOfGuests.message}</p>}
                </div>
                
                <button disabled={!startDate && !endDate || isPending} className={`mx-4 px-2 py-1 rounded-md ${!startDate && !endDate ? "bg-gray-500" : "bg-gray-900"}  text-white`}>Reserve room</button>
                
                {/* { !user.isAdmin && 
                    <Button variant="contained" color="secondary" disabled={!startDate && !endDate || isPending} className={`mx-4 px-2 py-1 rounded-md ${!startDate && !endDate ? "bg-gray-500" : "bg-gray-900"}  text-white`} >Reserve room</Button>
                } */}
            </form>

        </div>
    )

}