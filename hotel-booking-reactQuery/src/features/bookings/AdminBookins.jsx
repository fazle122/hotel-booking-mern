
import BookingRow from "../../components/BookingRow";
import CircularProgressItem from "../../components/CircularProgressItem";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import Sort from "../../components/Sort";
import { useFetchAllBookings  } from "./useBooking"



export default function AdminBookings(){

    const {bookings,isLoading,isError} = useFetchAllBookings();
    console.log(bookings);


    const bookingFilterOptions = [
        { value: 'all', label: 'All' },
        { value: 'booked', label: 'Booked'},
        { value: 'checkedin', label: 'Checked in' },
        { value: 'checkedout', label: 'Checked out' },
      ];

    //   const bookingTestOptions = [
    //     { value: '1', label: 'One'},
    //     { value: '2', label: 'Two'},
    //     { value: '3', label: 'Three' },
    //     { value: '4', label: 'Four' },
    //   ];

    const bookingSortOptions = [
        { value: 'startDate-asc', label: 'Date(recent first)' },
        { value: 'startDate-desc', label: 'Date(recent last)'},
        { value: 'totalPrice-asc', label: 'Amount(low)'},
        { value: 'totalPrice-desc', label: 'Amount(high)'},
      ];


    // if(isLoading) return <CircularProgressItem />
    if(isError) return <p>Something went wrong.</p>
    const bookingData = bookings?.data?.bookings;
    const totalBookings = bookings?.data?.count;
    const totalPageCount = bookings?.data?.pages;
    const pageSize = 4;


    return(
        <div className="mx-4 my-2 py-4 space-y-4 relative overflow-x-auto flex flex-col">
            <div className="flex justify-between">
                <p className="text-xl">All Bookings</p>
                <div className="flex space-x-4">
                    <Filter filterField={"status"} options={bookingFilterOptions} />
                    {/* <Filter filterField={"numOfGuests"} options={bookingTestOptions} /> */}
                    <Sort options={bookingSortOptions} />
                </div>
            </div>
            
  
            <div className="flex flex-col items-center justify-center space-y-4 min-h-2.5">

            { isLoading  ? <CircularProgressItem /> 
                :
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cabin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Guest
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Guest count
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    
                    </tr>
                </thead>
                {
                    bookings.data.bookings.length === 0 ? <p className="flex items-center justify-center">No booking data</p> :

                    <tbody>
                        {
                            bookingData.map((booking) => 
                                <BookingRow key={booking._id} booking={booking} />   
                            )   
                        }

                    </tbody>
                }
            </table> }
            </div>
            

            
            <Pagination totalItems={totalBookings} pageSize={pageSize} totalPageCount={totalPageCount}/>

            
        </div>
    )


}