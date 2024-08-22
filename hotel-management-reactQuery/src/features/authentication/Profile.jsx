import PasswordEditForm from "../../components/PasswordEditForm";
import ProfileEditForm from "../../components/ProfileEditForm";
import { useUserProfile } from "./useAuth"
import { Spinner } from "@material-tailwind/react";




export default function Profile(){
    const {data:profile,isFetching} = useUserProfile();
    const profileData = profile?.data;
    // console.log(profileData)

    if(isFetching) <div className="flex items-center justify-center h-screen"><Spinner /></div>

    
    


    

    return (
        <div className="mx-4 my-2 py-4">

            <ProfileEditForm  profileData={profileData} />
            <PasswordEditForm />

        </div>
    )
}