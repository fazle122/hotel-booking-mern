import { useFetchCabins } from "./useCabin"
import CabinRow from "../../components/CabinRow";
import AddCabin from "./AddCabin";
import Filter from "../../components/Filter";
import { useSearchParams } from "react-router-dom";
import Sort from "../../components/Sort";
import { Spinner } from "@material-tailwind/react";




export default function Cabins(){

    const {cabin,isLoading,isError} = useFetchCabins();

    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("discount") || "all";
    

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

 
   


    if(isLoading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>

    if(isError) return <p>Something went wrong</p>


//========= filter ==========//
    let filteredCabins;
    const cabinData = cabin.data.cabins;
    if(filterValue === "all") filteredCabins = cabinData;
    if(filterValue === "no-discount") filteredCabins = cabinData.filter((cb) => cb.discount === 0);
    if(filterValue === "with-discount") filteredCabins = cabinData.filter((cb) => cb.discount > 0);

    if(!filteredCabins) return <p>No cabin data</p>


//========= sort ==========//
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const [field,direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier);







    console.log(sortedCabins);

    return (

        <div className="mx-4 my-2 py-4 space-y-4 relative overflow-x-auto">
            <div className="flex justify-between">
                <p className="text-xl">All Cabins</p>
                <Filter filterField={"discount"} options={cabinFilterOptions}/> 
                <Sort options={cabinSortOptions} />
                <AddCabin />
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cabin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Capacity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Discount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        // cabinData.map((cabin) => 
                        // filteredCabins.map((cabin) => 
                        sortedCabins.map((cabin) => 
                            <CabinRow key={cabin._id} cabin={cabin} />   
                        )   
                    }

                </tbody>
            </table>
            
        </div>

    )
}