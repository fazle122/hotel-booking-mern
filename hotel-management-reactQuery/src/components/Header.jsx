import { NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useGetLoggedUser, useLogoutUser } from "../features/authentication/useAuth";
import { AiOutlineLogin } from "react-icons/ai";


export default function Header(){
    const {user} = useGetLoggedUser();
    const {mutate:logout} = useLogoutUser();

    

    return(
        <div className="px-1 py-1 flex justify-end">
            <ul className="flex space-x-4">
                { user ?
                    <div className="px-2 bg-gray-400 rounded-md">
                        {user.name}
                    </div>
                    : <div className="px-2 bg-gray-400 rounded-md">Guest user</div>
                }
                {!user && <NavLink to='/login' className='flex space-x-2'>
                    <AiOutlineLogin className="my-1"/>
                    <span>Login</span>
                </NavLink>}
                {user && <div className='flex space-x-2'>
                    <LuLogOut className="my-1"/>
                    <button onClick={logout}>Logout</button>
                </div>}
            </ul>
        </div>
    )
}