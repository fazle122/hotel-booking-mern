
/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom"


export default function Pagination({totalItems,pageSize,totalPageCount}){

    const [searchParams,setSearchParams] = useSearchParams();

    const currentPage = !searchParams.get("pageNo") ? 1: Number(searchParams.get("pageNo"));

    function previous(){
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set("pageNo",prev);
        setSearchParams(searchParams);
    }

    function next(){
        const next =  currentPage === totalPageCount ? currentPage : currentPage + 1;
        searchParams.set("pageNo",next);
        setSearchParams(searchParams);
    }



    if(totalPageCount <= 1) return null
    return(
        <div className="flex space-x-8">
            <button disabled={currentPage === 1} onClick={previous} className={`${currentPage === 1 ? "bg-gray-500" : "bg-white"}  px-2 border-2 border-black rounded-md`}>Previous</button>
            <p>
                Showing <span>{(currentPage - 1) * pageSize + 1 }</span> to  <span>{currentPage === totalPageCount ? totalItems :currentPage * pageSize}</span> of <span>{totalItems}</span> results
            </p>
            <button disabled={currentPage === totalPageCount} onClick={next} className={`${currentPage === totalPageCount ? "bg-gray-500" : "bg-white"}  px-5 border-2 border-black rounded-md`}>Next</button>

        </div>
    )
}