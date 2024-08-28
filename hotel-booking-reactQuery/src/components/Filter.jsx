/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {useSearchParams} from 'react-router-dom'


export default function Filter({filterField,options}){
    const [searchParams,setSearchParams] = useSearchParams();
    const filteredValue = searchParams.get(filterField);

    function handleClick(value){
        if(searchParams.get("pageNo")){
            searchParams.set("pageNo",1);
        }

        searchParams.set(filterField,value);
        // console.log(searchParams);
        setSearchParams(searchParams);
    }

    return (
        <div className="px-2 space-x-2 border-2  border-gray-900 rounded-md">
            {
                options.map((option) =>
                    <button key={option.value} 
                    onClick={() => handleClick(option.value)}
                    disabled={filteredValue === option.value}
                    className={`${filteredValue === option.value.toString() ? "bg-blue-gray-400" : "bg-white"} my-1 px-2 py-1 rounded-sm`}
                    >
                        {option.label}
                    </button>
                )
            }
       </div>
    )
}