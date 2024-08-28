import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ReservationProvider } from "./ReservationContext";


export default  function Applayout(){

    return(
        <div className="grid grid-cols-5">
            <Sidebar />
            <div className="col-span-4 ">
                <Header className="bg-gray-50"/>
                <main className="bg-gray-100 h-screen">
                    <ReservationProvider>
                        <Outlet />
                    </ReservationProvider>

                </main>
            </div>
        </div>
    )
}