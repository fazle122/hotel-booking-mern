import { useGetLoggedUser } from "../authentication/useAuth"
import CircularProgressItem from "../../components/CircularProgressItem";
import Pagination from "../../components/Pagination";
import CabinCard from "../../components/CabinCard";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSearchParams } from "react-router-dom";
import moment from "moment"
import { useFetchCabinsAvailability } from "../cabin/useCabin";


export default function Dashboard(){
    const {user} = useGetLoggedUser()

    const [searchParams,setSearchParams] = useSearchParams();  
    // const {data,isLoading:isCheckingAvailability} = useFetchCabinAvailability()

    const {cabin,isLoading,isError} = useFetchCabinsAvailability();
    const [checkDate, setCheckDate] = useState([]);

    const dateParams = searchParams.get("startDate") || searchParams.get("endtDate");


    // if(isLoading) return <CircularProgressItem />

    function handleChekAvailability(e){
        e.preventDefault();
        const startDate = moment(checkDate[0].$d).format('yyyy-MM-DD');
        const endDate = moment(checkDate[1].$d).format('yyyy-MM-DD');
         searchParams.set('startDate',startDate); 
        searchParams.set('endDate',endDate); 
        setSearchParams(searchParams);
    }

    if(isError) return <p>Something went wrong</p>
    const cabinData = cabin?.data?.cabins;
    const tatoalCabin = cabin?.data?.count;
    const totalPageCount = cabin?.data?.pages;
    const pageSize = 4;

    return (
        <div className="flex flex-col items-center space-y-8 justify-center">
            <p className="text-xl">{`Wellcome back ${user ? user.name : 'Guest'}`}</p>
            <div className="flex space-x-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                    value={checkDate}
                    onChange={(newValue) => {
                        setCheckDate(newValue);
                        console.log(checkDate);
                    }}
                />
                </LocalizationProvider>
                <button onClick={handleChekAvailability} className="px-2 bg-black text-white rounded-md">Check Availability</button>
            </div>
            <div>{dateParams ?  <p>Available rooms</p> : <p>Our most popular rooms</p>}</div>
            <div className="flex flex-wrap  items-start justify-start">
                {isLoading ?  <CircularProgressItem /> :
                    cabinData.map((cabin) => 
                        <CabinCard key={cabin._id} cabin={cabin} />   
                    )   
                }
            </div>
            
            <Pagination totalItems={tatoalCabin} pageSize={pageSize} totalPageCount={totalPageCount}/>

        </div>
    )
}