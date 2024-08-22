import { useFetchTodaysBookings } from "../features/bookings/useBooking"
import BookingRow from "./BookingRow";
import { Spinner } from "@material-tailwind/react";



export default function CurrentDayActivity(){

    const {bookings,isLoading} = useFetchTodaysBookings();
    console.log(bookings);
    const bookingsData = bookings?.data?.bookings;

    if(isLoading)  <div className="flex items-center justify-center h-screen"><Spinner /></div>

    if(bookingsData.length === 0) return <p>No checkin or checkout today</p>


    return (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-2.5">
        <table className="px-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        
                    </th>
                
                </tr>
            </thead>
            {
                bookings.data.bookings.length === 0 ? <p className="flex items-center justify-center">No booking data</p> :

                <tbody>
                    {
                        bookingsData.map((booking) => 
                            <BookingRow key={booking._id} booking={booking} forDashBoard={true}/>   
                        )   
                    }

                </tbody>
            }
        </table> 
        </div>
    )
}