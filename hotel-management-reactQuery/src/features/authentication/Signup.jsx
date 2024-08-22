
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetLoggedUser, useSignupUser } from "./useAuth";




export default function Signup(){

    const {user} = useGetLoggedUser();
    const {register,reset,handleSubmit,getValues,formState:{errors,isSubmitting}} = useForm();
    const navigate = useNavigate();
    const {mutate:signupUser,isLoading} = useSignupUser();


    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; 

    useEffect(() => {
        if(user){
            navigate(redirect);
        }
    },[user,navigate,redirect])


    function signup(data){
        signupUser(data,{onSettled:reset()});
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(signup)} className="flex flex-col space-y-2">
                <input type="name" name="email" placeholder="user name" className="border-4 border-red-100 rounded-md w-300"
                {...register("name",{
                    required:'please enter name'
                })} />

                {errors?.name?.message && <p>{errors.name.message}</p>}
                <input type="email" name="email" placeholder="email" className="border-4 border-red-100 rounded-md w-300"
                {...register("email",{
                    required:'please enter email address',pattern: {value: /\S+@\S+\.\S+/,message:"please provide a valid eamil address"}
                })} />

                {errors?.email?.message && <p>{errors.email.message}</p>}
                <input type="password" name="password" placeholder="password" className="border-4 border-red-100 rounded-md w-300"
                {...register("password",{
                    required:'pleas enter password',minLength:{value:6,message:"password should be atleast 6 character long"}
                })} />
                {errors?.password?.message && <p>{errors.password.message}</p>}
                <input type="password" name="confirmPassword" placeholder="confirm password" className="border-4 border-red-100 rounded-md w-300"
                {...register("confirmPassword",{
                    required:'pleas enter confirm password',
                    validate:(value) => value === getValues().password || "confirm password did not match"
                })} />
                {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}
                <div>
                    <button disabled={isLoading && isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Register</button>
                </div>
                
                <div>
                    Already have an account ? <Link className="underline" to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
                </div>
            </form>
        </div>
    )
    
}