/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../features/authentication/useAuth";

export default function PasswordEditForm(){

    const {mutate:editPassword, isPending} = useUpdatePassword();
    const {register,handleSubmit,getValues,reset,formState:{errors,isSubmitting}} = useForm();

    
    function updatePassword(data){
        editPassword(data);
        reset();
    }

    return (
        <div className="mx-4 my-2 py-4">
            <form onSubmit={handleSubmit(updatePassword)}>
                <div className="bg-white mx-8 my-12 px-8 py-4 space-y-8 flex flex-col items-center justify-center">
                <div className="flex space-x-8">
                        <label>Old Password :</label>
                        <input type="password" name="oldPassword" placeholder="password" className="px-2 py-1 border border-gray-900 rounded-md w-300"
                        {...register("oldPassword",{
                            required:'pleas enter old password',minLength:{value:6,message:"password should be atleast 6 character long"}
                        })} />
                        {errors?.oldPassword?.message && <p>{errors.oldPassword.message}</p>}
                    </div>
                    <div className="flex space-x-8">
                        <label>Password :</label>
                        <input type="password" name="password" placeholder="password" className="px-2 py-1 border border-gray-900 rounded-md w-300"
                        {...register("password",{
                            required:'pleas enter password',minLength:{value:6,message:"password should be atleast 6 character long"}
                        })} />
                        {errors?.password?.message && <p>{errors.password.message}</p>}
                    </div>
                    <div className="flex space-x-8">
                        <label>Confirm password:</label>
                        <input type="password" name="confirmPassword" placeholder="confirm password" className="px-2 py-1 border border-gray-900 rounded-md w-300"
                        {...register("confirmPassword",{
                            required:'pleas enter confirm password',
                            validate:(value) => value === getValues().password || "confirm password did not match"
                        })} />
                        {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}

                    </div>
                    <button disabled={isPending && isSubmitting} className={`py-1 px-2 rounded-md ${isPending ? "bg-gray-700" : "bg-black"} text-white`}>Edit password</button>

                </div>
            </form>
        </div>
    ) 

}