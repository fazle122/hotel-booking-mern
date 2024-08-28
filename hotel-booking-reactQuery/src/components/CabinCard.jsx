/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { useDeleteCabin } from "../features/cabin/useCabin";
import { Link, useNavigate} from "react-router-dom";
// import { useGetLoggedUser } from "../features/authentication/useAuth";





export default function CabinCard({cabin}){

    const navigate = useNavigate()

    return(
        <>        
            <div className="px-4 py-4 rounded-md mr-8 mb-8 bg-white basis-1/5 h-84">
                    <Link>
                        <img className="w-72" src={cabin.images ? cabin?.images[0]?.url :'/images/default_cabin.png'} alt={cabin.name} />
                    </Link>  
                    <h1>{cabin.name}</h1>
                    <p>{`Max capacity : ${cabin.capacity}`}</p>
                    <p>{`Regular price : ${cabin.regularPrice}`}</p>
                    <p>{`Discount: ${cabin.discount}`}</p>
                    <button  className={`px-1 py-1 bg-black text-white border rounded-md`} onClick={() => navigate(`/rooms/${cabin._id}`)}>View</button>

            </div>            
        </>  
    )
}