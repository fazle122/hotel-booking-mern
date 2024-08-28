import { useNavigate } from "react-router-dom";
import { useDeleteBooking, useGetBookingDetail, useUpdateBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import ConfirmCheckBox from "../../components/ConfirmChekBox";
import { useFetchSettingsData } from "../bookings/useSettings";
import Modal from "../../components/Modal";
import { format } from "date-fns";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useMakePayment } from "./useCheckIn";




export default function CheckIn(){
    const [open, setOpen] = useState(false); 
    const [paymentOption, setPaymentOption] = useState();

    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const {booking,isLoading} = useGetBookingDetail();
    const {settings,isLoading:loadingSettings} = useFetchSettingsData();
    const {updateBooking} = useUpdateBooking();
    const {mutate:deleteBooking,isLoading:isDeleting} = useDeleteBooking();

    const {mutate:pay} = useMakePayment();


    const handleOpen = () => setOpen(!open);


    useEffect(() => {
        setConfirmPaid(booking?.data?.data?.isPaid ?? false)
    },[booking?.data?.data?.isPaid])

    useEffect(() => {
        setAddBreakfast(booking?.data?.data?.hasBreakfast ?? false)
    },[booking?.data?.data?.hasBreakfast])

    const navigate = useNavigate();

    if(isLoading || loadingSettings) return <p>Loading ...</p>
    const bookingData = booking.data.data;
    const breakFastPrice = settings.data.settings[0].breakfastPrice;
    console.log(breakFastPrice)

    const totalBreakfastPrice = breakFastPrice * bookingData.numOfGuests;
    console.log(totalBreakfastPrice )


    function handlePaid() {
        setConfirmPaid(!confirmPaid);
    }

    function handleCheckIn(){

        let updatedData;
        if(addBreakfast){
            updatedData = {
                hasBreakfast : true,
                extraPrice: totalBreakfastPrice,
                totalPrice : bookingData.totalPrice + totalBreakfastPrice,
                status : "checkedin",
                isPaid : true
            }
        }else{
            updatedData = {
                status : "checkedin",
                isPaid : true
            }
        }

        updateBooking({id:booking.data.data._id,data:updatedData});
        navigate('/bookings');
        
    }

    function handleCheckOut(){

        const updatedData = {
            status : "checkedout",
        }

        updateBooking({id:booking.data.data._id,data:updatedData});
        // navigate('/bookings');
        
    }

    function handleAddBreakfast(){
        setAddBreakfast(!addBreakfast);
        setConfirmPaid(!confirmPaid)

        // const updatedData = {
        //     isPaid : false,
        //     totalPrice : bookingData.totalPrice + totalBreakfastPrice,
        //     hasBreakfast : true
        // }
        // updateBooking({id:booking.data.data._id,data:updatedData});
        
    }

    function handleDelete(){

        deleteBooking(bookingData._id);
        navigate('/bookings');
        
    }



    const handlePaymentOption = (event) => {
        setPaymentOption(event.target.value);
        
    };

    const handlePayment = (event) => {
        event.preventDefault();
        const paymentData = {
            bookingId:bookingData._id,
            totalPrice: bookingData.totalPrice
        }
        pay(paymentData);

    };

    const total = !addBreakfast ?bookingData.totalPrice : bookingData.totalPrice + totalBreakfastPrice;


    return (
        <div className="px-4 py-4" >
        <div className="py-4 flex space-x-12 justify-between">
            <div>
                <h1 className="text-2xl"> {`Checkin # ${bookingData._id}`}</h1>
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
                    <p>{`Total price:  ${total }`}</p>
                </div>

                {!bookingData.hasBreakfast && <div className="px-12 py-4 flex justify-between">
                    <ConfirmCheckBox title={"Add breakfast"} value={addBreakfast} onClick={handleAddBreakfast}/>
                </div>}

                <div className="px-12 py-4 flex justify-between">
                    <ConfirmCheckBox title={"paid"} value={confirmPaid} onClick={handlePaid}/>
                    {   bookingData.status !== 'checkedin' &&  booking.status !== 'checkedout' &&
                        <button disabled={!confirmPaid} className={`${confirmPaid ? "bg-green-300" : "bg-red-200"} px-1 py-1 border rounded-md`} onClick={handleCheckIn}>Confirm booking</button>
                    }
                    {   bookingData.status === 'checkedin'  &&
                        <button className={`bg-gray-500 px-1 py-1 border rounded-md`} onClick={handleCheckOut}>Check Out</button>
                    }
                    {   bookingData.status === 'booked'  &&
                        <button className={`bg-gray-500 px-1 py-1 border rounded-md`} onClick={handleOpen}>Delete booking</button>
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
                <div>
                    <h1 className="underline">Payment option</h1>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={paymentOption}
                                onChange={handlePaymentOption}
                            >
                                <FormControlLabel value="now" control={<Radio />} label="Pay now" />
                                <FormControlLabel value="male" control={<Radio />} label="Pay at hotel" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                {paymentOption === "now" ?
                <div>
                    <button onClick={handlePayment}className="px-2 py-1 rounded-md bg-black text-white">pay</button>
                </div> : <div></div>}
            </div>       
                
        </div>
    </div>
    )
}