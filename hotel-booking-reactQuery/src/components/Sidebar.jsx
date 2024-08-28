import Navbar from "./Navbar";



export default function Sidebar(){

    return(
        <div className="space-y-4">
            <p className="flex items-center justify-center">Logo</p>
            <Navbar className="flex flex-col"/>
        </div>
    )
}