import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUser } from "../features/authentication/useAuth";
import CircularProgress from '@mui/material/CircularProgress';




export default function AdminRoute(){
    const {user,isLoading} = useGetLoggedUser();

    if(isLoading) <div className="flex items-center justify-center h-screen"><CircularProgress /></div>



    return user && user.isAdmin ? <Outlet /> : <Navigate to='/' replace />
}