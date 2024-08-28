/* eslint-disable react/prop-types */

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Error({err,resetErrorBoundary}){

    return(
        <div className="flex items-center justify-center h-screen text-3xl">
            <div className="grid grid-cols-5">
            <Sidebar />
            <div className="col-span-4 ">
                <Header className="bg-gray-50"/>
                <main className="bg-gray-100 h-screen">
                    <p>Something went wrong, please try again later</p>
                    <p>{err}</p>
                    <button className="border rounded-md bg-black text-white" onClick={resetErrorBoundary}>
                        Try again
                    </button>
                </main>
            </div>
        </div>
        </div>
    )
}