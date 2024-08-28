
import {useForm} from "react-hook-form";
import { useGetLoggedUser, useLoginUser } from "./useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Login(){
    const {user} = useGetLoggedUser()
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm();
    const {mutate:login,isLoading} = useLoginUser();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; 
    console.log('redirect',redirect);

    useEffect(() => {
        if(user){
            navigate(redirect);
        }
    },[user,navigate,redirect,login])


    function loginUser(data){
        login(data,{onSettled:() => {reset()}})
        navigate(redirect);

    }

    

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit(loginUser)} className="flex flex-col space-y-2">
                <input type="email" name="email" placeholder="email" className="border-4 border-red-100 rounded-md w-300"
                {...register("email",{
                    required:'please enter email address'
                })} />

                {errors?.email?.message && <p>{errors.email.message}</p>}
                <input type="password" name="password" placeholder="password" className="border-4 border-red-100 rounded-md w-300"
                {...register("password",{
                    required:'pleas enter password'
                })} />
                {errors?.password?.message && <p>{errors.password.message}</p>}
                <div>
                    <button disabled={isSubmitting && isLoading} className="rounded-md bg-black text-white px-5 py-2">Log in</button>
                </div>
                <div>
                    New user? <Link className="underline" to={redirect ? `/signup?redirect=${redirect}` : `/register`}>Register</Link>
                </div>

            </form>
            {/* {isGoogleAuthLoading ? <p>Loading...</p> :
            <button className='border rounded-md text-white bg-black px-2 py-1 my-2' onClick={handleGoogleLogin}>
                    Sign In With Google
            </button>} */}
            
        </div>
    )
}