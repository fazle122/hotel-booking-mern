/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom"




export default function Sort({options }){

    const [searchParams,setSearchParams] = useSearchParams();  
    const sortBy = searchParams.get('sortBy');

    function handleChange(e){
        searchParams.set('sortBy',e.target.value); 
        setSearchParams(searchParams);
    }

    
    return(
        <div>
            <select 
            onChange={handleChange}
            value={sortBy}
            className="border rounded  px-4 py-2 w-36">
                {options.map((option) => 
                    <option key={option.value} value={option.value}>{option.label}</option>
                )}
            </select>
            
        </div>
    )
}    