// /* eslint-disable react/prop-types */
// import { createPortal } from 'react-dom';
// import { Dialog,DialogHeader,DialogBody,} from "@material-tailwind/react";



// export default function Modal({title,isOpen,handleOpen,children}){

//     return createPortal(
//       <div>
//         <Dialog open={isOpen} handler={handleOpen}>
//             <DialogHeader className="px-16 flex justify-between">
//               <p>{title}</p>
//               <button className="px-2 border rounded-full bg-white text-gray-700" onClick={handleOpen}>X</button>
//             </DialogHeader>
//             <DialogBody>
//               {children}
//             </DialogBody>
//             {/* <DialogFooter>
//               <Button
//                 variant="text"
//                 color="red"
//                 onClick={handleOpen}
//                 className="mr-1"
//               >
//                 <span>Cancel</span>
//               </Button>
//               <Button variant="gradient" color="green" onClick={handleOpen}>
//                 <span>Confirm</span>
//               </Button>
//             </DialogFooter> */}
//           </Dialog>
//       </div>,
//       document.body
//     )
// }
