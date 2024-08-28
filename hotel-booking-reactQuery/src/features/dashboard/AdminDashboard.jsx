/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import { useFilterBookings } from "../bookings/useBooking";
import StatusItem from "../../components/StatusItem";
import { useFetchCabins } from "../cabin/useCabin";
import { useSearchParams } from "react-router-dom";
import CurrentDayActivity from "../../components/CurrentDayActivity";
import SalesChart from "../../components/SalesChart";
// import StatusChart from "../../components/StatusChart";





export default function AdminDashboard(){
    const {data:bookings,isFetching} = useFilterBookings();
    console.log(isFetching);
    const {cabin} = useFetchCabins();
    const [searchParams] = useSearchParams();
    const filterCount  = searchParams.get("last") ? searchParams.get("last") : 7;
    const cabinData = cabin?.data?.cabins;
    const totalNightightCount = cabinData?.length * filterCount;

    const bookingData = bookings?.data?.bookings;
    //console.log(bookingData);
    const [bookReservation,setBookReservation] = useState([]);
    const [stayReservation,setStayReservation] = useState([]);
    const [checkInReservation,setCheckInReservation] = useState([]);



    useEffect(() => {
        if(bookingData){
                const filteredData = bookingData.filter((data) => data.status === "booked");
                console.log('filteredData',filteredData);
                setBookReservation(filteredData);
        }
    },[bookingData])

    useEffect(() => {
        if(bookingData){
                const filteredData = bookingData.filter((data) => data.status === "checkedout" || data.status === "checkedin");
                setStayReservation(filteredData);
        }
    },[bookingData])

    useEffect(() => {
        if(bookingData){
                const filteredData = bookingData.filter((data) => data.status === "checkedin");
                setCheckInReservation(filteredData);
        }
    },[bookingData])

    const sales = stayReservation.reduce((total,current) => total + current.totalPrice,0);
    const reservationCount = stayReservation.reduce((total,current) => total+current.numOfNights,0)/totalNightightCount;
    const reservationRatio = Math.round(reservationCount * 100) + "%"


    const filterOptions = [
        { value: 7, label: 'Last 7 days'},
        { value: 30, label: 'Last 30 days' },
        { value: 90, label: 'Last 90 days' },
      ];


    // if(isFetching) return <div className="flex items-center justify-center h-screen"><Spinner /></div>


    return (
        <div>

            <h1>Admin dashboard</h1>
            <div className="flex justify-center">
                <div className="flex space-x-4">
                    <Filter filterField={"last"} options={filterOptions} />
                </div>
            </div>
            <div className="mx-4 my-8 flex space-x-8 items-center justify-left">
                <StatusItem title={"Booked"} count={bookReservation.length} />
                <StatusItem title={"Checked In"} count={stayReservation.length}/>
                <StatusItem title={"Sales"} count={sales} />
                <StatusItem title={"Occupancey"} count={reservationRatio} />
            </div>
            <div className="grid grid-cols-3 space-x-8">
                <div className="px-4 col-span-2">
                    <CurrentDayActivity />
                </div>
                <div>
                    {/* <StatusChart /> */}
                    <SalesChart bookings={checkInReservation}/>

                </div>
            </div>

 
        </div>
    )



}