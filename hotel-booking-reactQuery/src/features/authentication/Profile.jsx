import CircularProgressItem from "../../components/CircularProgressItem";
import PasswordEditForm from "../../components/PasswordEditForm";
import ProfileEditForm from "../../components/ProfileEditForm";
import { useUserProfile } from "./useAuth"




export default function Profile(){
    const {data:profile,isFetching} = useUserProfile();
    const profileData = profile?.data;
    // console.log(profileData)

    if(isFetching) return <CircularProgressItem />

    
    


    

    return (
        <div className="mx-4 my-2 py-4">

            <ProfileEditForm  profileData={profileData} />
            <PasswordEditForm />

        </div>
    )
}