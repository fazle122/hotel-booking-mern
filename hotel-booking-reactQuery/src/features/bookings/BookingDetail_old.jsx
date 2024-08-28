import { useNavigate } from "react-router-dom";
import { useGetBookingDetail } from "./useBooking";
import EmptyContainer from "../../components/EmptyContainer";
import CircularProgressItem from "../../components/CircularProgressItem";


export default function BookingDetail(){

    const {booking,isLoading} = useGetBookingDetail();
    console.log(booking);
    const navigate = useNavigate();

    if(isLoading) return <CircularProgressItem />

    if(booking === undefined ) return <EmptyContainer />

    console.log(booking);
    const bookingData = booking?.data?.data;



    return (
        <div className="px-4 py-4" >
            <div className="py-4 flex space-x-12 justify-between">
                <div>
                    <h1 className="text-2xl"> {`Booking # ${bookingData._id}`}</h1>
                    <p className="px-2 py-1 rounded-xl bg-gray-400 w-24">{bookingData.status}</p>
                </div>
                <button onClick={() => navigate(-1)}className="rounded-md bg-black text-white h-8 px-2"> {`<-- Back`}</button>
            </div>
            <div className="px-2 py-2 rounded-md bg-white">
                <div className="flex justify-between rounded-t-md h-12 text-xl">
                    <p>{` ${bookingData.numOfNights} nights in ${bookingData.cabin.name}`}</p>
                    <p>{` ${bookingData.startDate} - ${bookingData.endDate}`}</p>
                </div>
                <div className="py-4">
                    <p>{`Guest name :  ${bookingData.user.name}`}</p>
                    <p>{`Email address :  ${bookingData.user.email}`}</p>
                    <p>{`Booking date :  ${bookingData.createdAt}`}</p>
                    <p>{`Breakfast :  ${bookingData.hasBreakfast ? "Included" : "Not-included"}`}</p>
                    <p>{`Payment status :  ${bookingData.isPaid ? "Paid" : "Un-paid"}`}</p>

                </div>

                <div className="px-12 py-4 flex justify-between">
                    <p>{`Total price:  ${bookingData.totalPrice}`}</p>
                    {   bookingData.status !== 'checkedin' &&  booking.status !== 'checkedout' &&
                        <button className={`bg-gray-500 px-1 py-1 border rounded-md`} onClick={() => navigate(`/checkIn/${bookingData._id}`)}>Check In</button>
                    }

                    
                </div>

            </div>
        </div>
    )
}