import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUser } from "../features/authentication/useAuth";
import { Spinner } from "@material-tailwind/react";




export default function AdminRoute(){
    const {user,isLoading} = useGetLoggedUser();

    if(isLoading) <div className="flex items-center justify-center h-screen"><Spinner /></div>



    return user && user.isAdmin ? <Outlet /> : <Navigate to='/' replace />
}