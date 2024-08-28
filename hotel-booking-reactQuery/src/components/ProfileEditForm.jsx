/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../features/authentication/useAuth";

export default function ProfileEditForm({profileData}){

    const {mutate:editProfile, isPending} = useUpdateProfile();
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({defaultValues:profileData});

    

    // console.log(profileData);

    function updateProfile(data){
        editProfile(data);
        // console.log(data);
    }

    return (
        <div className="mx-4 my-2 py-4">
            <form onSubmit={handleSubmit(updateProfile)}>
                <div className="bg-white mx-8 my-12 px-8 py-4 space-y-8 flex flex-col items-center justify-center">
                    <div className="flex space-x-8">
                        <label>Email address :</label>
                        <input type="text" 
                            name="email"
                            className="px-2 py-1 bg-blue-gray-50 border border-gray-900 rounded-md"
                            disabled 
                            {...register("email")}
                        />
                    </div>
                    <div className="flex space-x-8">
                        <label>Guest name :</label>
                        <input type="text" 
                            name="name"
                            className="px-2 py-1 bg-white border border-gray-900 rounded-md" 
                            {...register("name",{required:"please enter your name",maxLength:100})}
                        />
                        {errors?.name?.message && <p className='text-red-600'>{errors.name.message}</p>}

                    </div>
                    <button disabled={isPending && isSubmitting} className={`py-1 px-2 rounded-md ${isPending ? "bg-gray-700" : "bg-black"} text-white`}>Edit profile</button>

                </div>
            </form>
        </div>
    ) 

}