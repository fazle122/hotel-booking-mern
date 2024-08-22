
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom'
import Dashboard from './features/dashboard/Dashboard'
import Cabins from './features/cabin/Cabin.jsx'
import NotFound from './components/NotFound.jsx'
import Applayout from './components/Applayout.jsx'
import { Toaster } from "react-hot-toast";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Booking from './features/bookings/Booking.jsx'
import CheckIn from './features/checkIn/CheckIn.jsx'
import BookingDetail from './features/bookings/BookingDetail.jsx'
import Login from './features/authentication/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Signup from './features/authentication/Signup.jsx'
import CabinDetail from './features/cabin/CabinDetail.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminBookings from './features/bookings/AdminBookins.jsx'
import Profile from './features/authentication/Profile.jsx'
import AdminDashboard from './features/dashboard/AdminDashboard.jsx'



const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0
    }
  }

})

export default function App (){

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Applayout />}>
          <Route index path='/' element={<Navigate replace to='/dashboard' />} />
          <Route  path='/dashboard' element={<Dashboard />} />
          <Route  path='/cabins' element={<Cabins />} />
          <Route  path='/cabins/:id' element={<CabinDetail />} />
          <Route path='' element={<PrivateRoute />} >
            <Route  path='/profile' element={<Profile />} />
            <Route  path='/bookings' element={<Booking />} />
            <Route  path='/bookings/:id' element={<BookingDetail />} />
            <Route  path='/checkIn/:id' element={<CheckIn />} />
          </Route>
          <Route path='' element={<AdminRoute />} >
            <Route  path='/admin/dashboard' element={<AdminDashboard />} />
            <Route  path='/admin/bookings' element={<AdminBookings />} />
            {/* <Route  path='/bookings/:id' element={<BookingDetail />} /> */}
            {/* <Route  path='/checkIn/:id' element={<CheckIn />} /> */}
          </Route>
        </Route>
        <Route  path='/login' element={<Login />} />
        <Route  path='/signup' element={<Signup />} />
        <Route  path='/*' element={<NotFound />} />

      </Route>
  
   
    )
  )
  

  return(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false}/>
        <Toaster 
            position="top-center"
            gutter={12}
            containerStyle={{margin:"10px"}}
            toastOptions={{
              success:{duration:3000},
              error:{duration:5000},
              style:{
                fontSize:"14px",
                maxWidth:"550px",
                padding:"14px 22px"
              }
            }}
            
          />
    </QueryClientProvider>
  )
}
