/* eslint-disable react/prop-types */

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function NotFound(){

    return(
        <div className="flex items-center justify-center h-screen text-3xl">
            <div className="grid grid-cols-5">
            <Sidebar />
            <div className="col-span-4 ">
                <Header className="bg-gray-50"/>
                <main className="bg-gray-100 h-screen">
                    <p>Not found</p>
                </main>
            </div>
        </div>
        </div>
    )
}