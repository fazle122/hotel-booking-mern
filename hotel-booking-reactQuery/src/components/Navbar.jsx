import { NavLink } from "react-router-dom";
import { AiFillDashboard, AiFillHome, AiFillFileText } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { useGetLoggedUser } from "../features/authentication/useAuth";

export default function Navbar() {
  const { user } = useGetLoggedUser();

  return (
    <div className="py-8 flex items-center justify-center text-xl">
      <ul className="flex flex-col space-y-4">
        <NavLink to="/" className="flex space-x-2">
          <AiFillDashboard className="my-1" />
          <span>Home</span>
        </NavLink>
        {user && user.isAdmin && <NavLink to="/admin/dashboard" className="flex space-x-2">
          <AiFillDashboard className="my-1" />
          <span>Dashboard</span>
        </NavLink>}
        
        <NavLink to="/rooms" className="flex space-x-2">
          <AiFillHome className="my-1" />
          <span>Rooms</span>
        </NavLink>
        
        {user && user.isAdmin && (
          <NavLink to="/admin/rooms" className="flex space-x-2">
            <AiFillHome className="my-1" />
            <span>Manage Rooms</span>
          </NavLink>
        )}
        
          {user && <NavLink to="/bookings" className="flex space-x-2">
            <AiFillFileText className="my-1" />
            <span>Bookings</span>
          </NavLink>}
     

        {user && !user.isAdmin && (
          <NavLink to="/profile" className="flex space-x-2">
            <IoMdPerson className="my-1" />
            <span>Profile</span>
          </NavLink>
        )}
        {/* {user && user.isAdmin && (
          <NavLink to="/admin/bookings" className="flex space-x-2">
            <AiFillFileText className="my-1" />
            <span>All Bookings</span>
          </NavLink>
        )} */}

        {/* {!user && <NavLink to='/login' className='flex space-x-2'>
                    <AiOutlineLogin className="my-1"/>
                    <span>Login</span>
                </NavLink>}
                {user && <div className='flex space-x-2'>
                    <LuLogOut className="my-1"/>
                    <button onClick={logout}>Logout</button>
                </div>} */}
      </ul>
    </div>
  );
}
