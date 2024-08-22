import BookingRow from "../../components/BookingRow";
import Pagination from "../../components/Pagination";
import { useFetchAllBookings } from "../bookings/useBooking"
import { useGetLoggedUser } from "../authentication/useAuth";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

import { Spinner } from "@material-tailwind/react";



export default function Booking(){
    const {user} = useGetLoggedUser();
    const {bookings,isLoading,isError} = useFetchAllBookings();
    console.log(bookings);



    if(isLoading) <div className="flex items-center justify-center h-screen"><Spinner /></div>


    if(isError) return <p>Something went wrong.</p>
    const bookingData = bookings.data.bookings;
    const totalBookings = bookings.data.count;
    const totalPageCount = bookings.data.pages;
    const pageSize = 4;


    return(
        <div className="mx-4 my-2 py-4 space-y-4 relative overflow-x-auto flex flex-col items-center">
            <div className="flex justify-between">
                <p className="text-xl">My Bookings</p>
            </div>
  
            <div className="flex flex-col items-center justify-center space-y-4 min-h-2.5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cabin
                        </th>
                        {user.isAdmin && <th scope="col" className="px-6 py-3">
                            Guest
                        </th>}
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
                                <BookingRow key={booking._id} booking={booking} forDashBoard={false} />   
                            )   
                        }

                    </tbody>
                }
            </table> 
            </div>
            

            
            <Pagination totalItems={totalBookings} pageSize={pageSize} totalPageCount={totalPageCount}/>

            
        </div>
    )
}