import { useNavigate } from "react-router-dom";
import { useDeleteBooking, useGetBookingDetail, useUpdateBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useFetchSettingsData } from "../bookings/useSettings";
import Modal from "../../components/Modal";
import { format } from "date-fns";
import { useMakePayment } from "../checkIn/useCheckIn";
import { useGetLoggedUser } from "../authentication/useAuth";




export default function BookingDetail(){
    const {user} = useGetLoggedUser();
    const [open, setOpen] = useState(false); 
    const [addBreakfast, setAddBreakfast] = useState(false);
    const {booking,isLoading} = useGetBookingDetail();
    const {settings,isLoading:loadingSettings} = useFetchSettingsData();
    const {mutate:deleteBooking,isLoading:isDeleting} = useDeleteBooking();

    const {mutate:makePayment} = useMakePayment();
    const {mutate:updateBooking} = useUpdateBooking();


    const handleOpen = () => setOpen(!open);


    useEffect(() => {
        setAddBreakfast(booking?.data?.data?.hasBreakfast ?? false)
    },[booking?.data?.data?.hasBreakfast])

    const navigate = useNavigate();

    if(isLoading || loadingSettings) return <p>Loading ...</p>
    const bookingData = booking.data.data;
    const breakFastPrice = settings.data.settings[0].breakfastPrice;
    // console.log(breakFastPrice)

    const totalBreakfastPrice = breakFastPrice * bookingData.numOfGuests;
    // console.log(totalBreakfastPrice )

    function handleDelete(){
        deleteBooking(bookingData._id);
        navigate('/bookings');
    }



    const handlePayment = (event) => {
        event.preventDefault();
        const paymentData = {
            bookingId:bookingData._id,
            totalPrice: bookingData.totalPrice
        }
        makePayment(paymentData);
    };

    const handleAdminPayment = (event) => {
        event.preventDefault();
        const bookingData = {
            isPaid:true,
        }
        updateBooking({id:bookingData._id,data:bookingData});
    };

    const total = !addBreakfast ?bookingData.totalPrice : bookingData.totalPrice + totalBreakfastPrice;


    return (
        <div className="px-4 py-4" >
        <div className="py-4 flex space-x-12 justify-between">
            <div>
                <h1 className="text-2xl"> {`Booking ID : # ${bookingData._id}`}</h1>
                <p className="px-2 py-1 rounded-xl bg-gray-400 w-24">{bookingData.status}</p>
            </div>
            <button onClick={() => navigate(-1)}className="rounded-md bg-black text-white h-8 px-2"> {`<-- Back`}</button>
        </div>
        <div className="grid grid-cols-2 px-2 py-2 rounded-md bg-white">
            <div>
                <div className="flex justify-between rounded-t-md h-12 text-xl">
                    <p>{` ${bookingData.numOfNights} nights in ${bookingData.cabin.name}`}</p>
                </div>
                <div className="py-4">
                    <h1 className="underline">Guest detail</h1>
                    <p>{`Guest name :  ${bookingData.user.name}`}</p>
                    <p>{`Email address :  ${bookingData.user.email}`}</p>
                </div>
                <div className="py-4">
                    <h1 className="underline">Booking detail</h1>
                    <p>{`Check in:  ${format(new Date(bookingData.startDate),"yyyy-MM-dd")}`}</p>
                    <p>{`Check out:  ${format(new Date(bookingData.endDate),"yyyy-MM-dd")}`}</p>
                    <p>{`Num of guest :  ${bookingData.numOfGuests}`}</p>
                    <p>{`Breakfast :  ${bookingData.hasBreakfast ? "Included" : "Not-included"}`}</p>
                    <p>{`Payment status :  ${bookingData.isPaid ? "Paid" : "Un-paid"}`}</p>
                    <p>{`cabin price:  ${bookingData.cabinPrice}`}</p>
                    {/* <p>{`Total price:  ${!bookingData.hasBreakfast ? bookingData.totalPrice : bookingData.totalPrice + totalBreakfastPrice }`}</p> */}
                    <p>{`Total price:  ${total}`}</p>
                </div>

                

                <div className="px-12 py-4 flex justify-between">
                  
                    {   bookingData.status === 'booked'  &&
                        <button className={`bg-red-300 px-1 py-1 border rounded-md`} onClick={handleOpen}>Delete booking</button>
                    }
                    <Modal title={"Delete confirmation"} isOpen={open} handleOpen={handleOpen}>
                        <div className="flex flex-col items-center justify-center space-y-8">
                            <p>Are you sure, you want to delete this booking?</p>
                            <div className='space-x-4'>
                                <button disabled={isDeleting} className='bg-red-500 text-white px-2 py-1 border-4 rounded-md' onClick={handleDelete}>Confirm</button>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
            <div>
                { !user.isAdmin && !bookingData.isPaid && <button onClick={handlePayment}className="px-2 py-1 rounded-md bg-black text-white">Pay now</button>}
                { user.isAdmin && !bookingData.isPaid && <button onClick={handleAdminPayment}className="px-2 py-1 rounded-md bg-black text-white">Confirm payment</button>}
            </div>       
                
        </div>
    </div>
    )
}