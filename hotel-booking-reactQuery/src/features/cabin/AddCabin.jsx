
import { useState } from "react";      
import Modal from "../../components/Modal";
import CreateNewForm from "../../components/CreateNewCabin";




export default function AddCabin(){

    const [open, setOpen] = useState(false); 
    const handleOpen = () => setOpen(!open);

    return(
        <div className="flex justify-between">
            <button onClick={handleOpen} className="px-2 py-1 border-4 rounded-md">Add new</button>
            { 
                <Modal title={"Cabin data"} isOpen={open} handleOpen={handleOpen}>
                  <CreateNewForm title={"Cabin data"} handleOpen={handleOpen} />
                </Modal>
            }
        </div>
    )


    // return(
    //   <Modal>
    //     <Modal.Open opens="cabin-form">
    //       <button>Add new</button>
    //     </Modal.Open>
    //     <Modal.Window name="cabin-form">
    //       <CreateNewForm />
    //     </Modal.Window>
    //   </Modal>
    // )
}