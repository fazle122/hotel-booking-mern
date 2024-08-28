import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUser } from "../features/authentication/useAuth"
import CircularProgress from '@mui/material/CircularProgress';



export default  function PrivateRoute(){

    const {user,isLoading} = useGetLoggedUser();
    // console.log(user);

    if(isLoading) <div className="flex items-center justify-center h-screen"><CircularProgress /></div>


    // return user ? <Outlet /> : <Navigate to='/' replace />
    return user ? <Outlet /> : <Navigate to="/login" replace/>

}