import { useFetchCabins } from "./useCabin"
import AddCabin from "./AddCabin";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import CircularProgressItem from "../../components/CircularProgressItem";
import Pagination from "../../components/Pagination";
import { useGetLoggedUser } from "../authentication/useAuth";
import CabinCard from "../../components/CabinCard";


export default function Cabins(){

    const {cabin,isLoading,isError} = useFetchCabins();
    const {user,isLoading:isLoadingUser} = useGetLoggedUser();

    const cabinFilterOptions = [
        { value: 'all', label: 'All' },
        { value: 'no-discount', label: 'No discount'},
        { value: 'with-discount', label: 'With discount' },
      ];

     const cabinSortOptions = [
        { value: 'name-asc', label: 'name(A-Z)'},
        { value: 'name-desc', label: 'name(Z-A)'},
        { value: 'regularPrice-asc', label: 'price-asc'},
        { value: 'regularPrice-desc', label: 'price-desc'},
        { value: 'capacity-asc', label: 'capacity-asc'},
        { value: 'capacity-desc', label: 'capacity-desc'},
        
      ];

    if(isLoading || isLoadingUser) return <CircularProgressItem />

    if(isError) return <p>Something went wrong</p>
    const cabinData = cabin?.data?.cabins;
    const tatoalCabin = cabin?.data?.count;
    const totalPageCount = cabin?.data?.pages;
    const pageSize = 8;


    return (

        <div className="mx-4 my-2 py-4 space-y-4 relative overflow-x-auto">
            <div className="flex justify-between">
                <p className="text-xl">All Cabins</p>
                <Filter filterField={"discount"} options={cabinFilterOptions}/> 
                <Sort options={cabinSortOptions} />
            
                {/* <div className="flex">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                        value={checkDate}
                        onChange={(newValue) => {
                            setCheckDate(newValue);
                            console.log(checkDate);
                        }}
                    />
                    </LocalizationProvider>
                    <button onClick={handleChekAvailability} className="px-2 bg-black text-white rounded-md">Check</button>
                </div> */}
                
                {user && user.isAdmin && <AddCabin /> }
            </div>
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