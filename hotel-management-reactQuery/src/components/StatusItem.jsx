/* eslint-disable react/prop-types */

import {  AiFillHome  } from "react-icons/ai";



export default function StatusItem({title,count}){

    return(
        <div className="px-4 py-2 bg-white rounded-md">
            <h1>{title}</h1>
            <div className="flex space-x-6">
                <AiFillHome className="my-1" />
                <p>{count}</p>

            </div>
        </div>
    )
}