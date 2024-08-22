import { useGetLoggedUser } from "../authentication/useAuth"




export default function Dashboard(){
    const {user} = useGetLoggedUser()

    return (

        <p className="text-xl">{`Wellcome back ${user ? user.name : 'Guest'}`}</p>
    )
}