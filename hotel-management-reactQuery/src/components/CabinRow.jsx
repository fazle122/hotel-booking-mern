/* eslint-disable react/prop-types */
import { useState } from "react";
import CreateNewForm from "./CreateNewCabin";
import { useDeleteCabin } from "../features/cabin/useCabin";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";





export default function CabinRow({cabin}){

    const [editForm,setEditForm] = useState(false);
    const {isLoading:isDeleting,mutate} = useDeleteCabin();
    const navigate = useNavigate()
    const handleSetEdit = () => setEditForm(!editForm);
    


    return(
        <>                    
            <tr key={cabin._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                    image
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
                    <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={() => navigate(`/cabins/${cabin._id}`)}>View</button>
                    <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={() => mutate(cabin._id)}>Delete</button>
                    <button disabled={isDeleting} className={`${isDeleting ? "bg-gray-500": "bg-white"} px-1 py-1 border rounded-md`} onClick={handleSetEdit}>Edit</button>

                </td>
                
            </tr>
            { 
                // editForm && 
                <Modal title={"Cabin data"} isOpen={editForm} handleOpen={handleSetEdit}>
                    <CreateNewForm cabin={cabin} handleOpen={setEditForm} />
                </Modal>
            }
        </>  
    )
}