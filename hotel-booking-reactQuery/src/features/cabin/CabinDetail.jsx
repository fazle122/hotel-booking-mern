/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchCabinDetail } from "./useCabin";
import DateSelector from "../../components/DateSelector";
import { useFetchSettingsData } from "../bookings/useSettings";
import CreateBookingForm from "../../components/CreateBookingForm";
import { useGetLoggedUser } from "../authentication/useAuth";
import { useFetchBookedDates } from "../bookings/useBooking";
import { eachDayOfInterval } from "date-fns";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Carousel from 'react-material-ui-carousel'


export default function CabinDetail(){


    const{data:cabin,isFetching} = useFetchCabinDetail();
    const {data:bookedDates,isFetching:isFetchingDates} = useFetchBookedDates();
    const {settings,isFetching:isFetchingSettings} = useFetchSettingsData();

    const {user} = useGetLoggedUser();
    let allDates = [];

    function getDatesInRange(startDate, endDate) {
        return eachDayOfInterval({
            start: new Date(startDate),
            end: new Date(endDate)
        })
    } 

    useEffect(() => {
        if(bookedDates){
            bookedDates.data.data.map((bookedDate) => {
                const dates = getDatesInRange(bookedDate.startDate,bookedDate.endDate)
                // allDates.push(bookedDate);
                dates.map((date) => {
                    allDates.push(date);
                })
            })
            // console.log(allDates);
        }
    },[allDates,bookedDates])

    console.log('allDates',allDates);

    if(isFetching){console.log('now it is Fetching')}
    

    if(isFetching || isFetchingDates || isFetchingSettings) return <div className="flex items-center justify-center h-screen"><CircularProgress /></div>

    const cabinData = cabin.data.data;
    // console.log(cabinData);
    const settingsData = settings?.data?.settings[0];
    // console.log(settingsData);
    // console.log(bookedDates?.data?.data);
    


    return (
        <div className="space-y-24">

            <div className="my-8 grid grid-cols-2">                 
                <div className="px-4 h-48">
                <Carousel className="w-96"
                    cycleNavigation={true}
                >
                    {
                        cabinData?.images.map( (item, i) => <img key={i} className="mt-5 ml-10 w-64 h-48 md:w-80 px-2 py-2 rounded-lg border-2 border-red-900" src={item.url} alt={cabinData.name} /> )
                    }
                </Carousel>
                    {/* <img className="my-10 w-32 md:w-80 px-2 py-2 rounded-lg border-2 border-red-900" src={cabinData?.images[0]?.url} alt={cabinData.name} /> */}
                </div>
                <div className="space-y-4">
                    <h1 className="text-2xl">{cabinData.name}</h1>
                    <p>{cabinData.description}</p>
                    <p>{`Price: $${cabinData.regularPrice}`}</p>
                    <p>{`Capacity : ${cabinData.capacity}`}</p>
                    <p>{`Discount : $${cabinData.discount}`}</p>
                    {/* <div className="flex space-y-2 space-x-8">
                        <div className="space-x-2">
                            <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={increaseQuantity}>+</button>
                            <span>{qty}</span>
                            <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={decreaseQuantity}>-</button>

                        </div>
                        <button className="border-2 rounded-lg bg-black text-white px-2 py-2" onClick={handleClick}>{!existItem ? "Add to cart" : qty >0 ? "Update quantity" : "Add to cart"}</button>
                    </div> */}
                </div>
            

            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <p className="my-2 px-2">Select data :</p>
                    <DateSelector settings={settingsData} cabin={cabinData}  bookedDates={allDates}/>
                </div>
                <div>
                    <CreateBookingForm cabin={cabinData} user={user}/>
                    
                </div>

            </div>
            
            
        </div>
    )
    
}