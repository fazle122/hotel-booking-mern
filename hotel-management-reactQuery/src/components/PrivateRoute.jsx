import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUser } from "../features/authentication/useAuth"
import { Spinner } from "@material-tailwind/react";



export default  function PrivateRoute(){

    const {user,isLoading} = useGetLoggedUser();
    // console.log(user);

    if(isLoading) <div className="flex items-center justify-center h-screen"><Spinner /></div>


    return user ? <Outlet /> : <Navigate to='/' replace />
}