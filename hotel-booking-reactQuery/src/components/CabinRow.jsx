/* eslint-disable react/prop-types */
import { useState } from "react";
import CreateNewForm from "./CreateNewCabin";
import { useDeleteCabin } from "../features/cabin/useCabin";
import Modal from "./Modal";
import { Link, useNavigate} from "react-router-dom";
import { useGetLoggedUser } from "../features/authentication/useAuth";





export default function CabinRow({cabin}){

    const {user} = useGetLoggedUser();
    const [isEditFormOpen,setIsEditFormOpen] = useState(false);
    const {isLoading:isDeleting,mutate} = useDeleteCabin();
    const navigate = useNavigate()

    function handleSetEdit(){
        setIsEditFormOpen(!isEditFormOpen)
    }
    
    


    return(
        <>                    
            <tr key={cabin._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                    <Link>
                        <img className="w-12" src={cabin.images ? cabin?.images[0]?.url :'/images/default_cabin.png'} alt={cabin.name} />
                    </Link>  
                </td>
                <td className="px-6 py-4">
                    {cabin.name}
                </td>
                <td className="px-6 py-4">
                    {cabin.capacity}
                </td>
                <td className="px-6 py-4">
                    ${cabin.regularPrice}
                </td>
                <td className="px-6 py-4">
                    {cabin.discount}
                </td>
                <td className="px-6 py-4 space-x-4">
                    <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={() => navigate(`/rooms/${cabin._id}`)}>View</button>
                    
                    {user && user.isAdmin && 
                    <div>
                        <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={() => mutate(cabin._id)}>Delete</button>
                        <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={handleSetEdit}>Edit</button>
                    </div>
                    }

                </td>
                
            </tr>
            { 
                // editForm && 
                <Modal title={"Cabin data"} isOpen={isEditFormOpen} handleOpen={handleSetEdit}>
                    <CreateNewForm cabin={cabin} handleOpen={setIsEditFormOpen} />
                </Modal>
            }
        </>  
    )
}