import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserProfile, getLoggedInUser, login, logout, setLoggedInUser, signup, updatePassword, updateProfile } from "../../services/userService"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";






export function useGetLoggedUser(){
    const {data:user,isLoading} = useQuery({
        queryFn:() => getLoggedInUser(),
        queryKey:["user"],
    })

    return {user,isLoading}
}

export function useLoginUser(){

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; 
    console.log('redirect',redirect);

    const {mutate,isLoading,isError} = useMutation({
        mutationFn:(data) => login(data),
        onSuccess:(data) => {
            console.log(data.data);
            toast.success("logged in successfully");

            setLoggedInUser(data.data);
            navigate(redirect,{replace:true});
            queryClient.invalidateQueries({active:true})

            
        },
        onError:(err) => {
            console.log(err);
            toast.error(err.message)
        }
    }) 

    return {mutate,isLoading,isError};
}


export function useLogoutUser(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn:logout,
        onSuccess:() =>{
            localStorage.removeItem('guestInfo');
            queryClient.invalidateQueries({active:true})
            navigate('/',{replace:true});
        }
    })
    return {mutate}
}


export function useSignupUser(){
    const navigate = useNavigate();

    const {mutate,isLoading} = useMutation({
        mutationFn:(data) => signup(data),
        onSuccess:(data) =>{
            console.log(data.data);
            toast.success("logged in successfully");
            setLoggedInUser(data.data);
            navigate("/",{replace:true});
        },
        onError:(err) => {
            console.log(err);
            toast.error(err.message)
        }
    })
    return {mutate,isLoading}
}


export function useUserProfile(){
    
    const {data,isLoading,isFetching} = useQuery({
        queryKey:['profile'],
        queryFn:fetchUserProfile,
        onSuccess:(data) => {
            console.log(data);
        },
        onError:(err) => {
            console.log(err);
            toast.error(err.message)
        }
    })

    return {data,isLoading,isFetching}
}



export function useUpdateProfile(){
    const queryClient = useQueryClient();

    const {mutate,isLoading} = useMutation({
        mutationFn:(data) => updateProfile(data),
        onSuccess:(data) =>{
            console.log(data.data.data);
            queryClient.invalidateQueries({ queryKey:["profile"]})
            setLoggedInUser(data.data.data);
            queryClient.invalidateQueries({active:true})
            toast.success("profile updated successfully");
            

        },
        onError:(err) => {
            console.log(err);
            toast.error(err.message)
        }
    })
    return {mutate,isLoading}

}


export function useUpdatePassword(){
    // const queryClient = useQueryClient();

    const {mutate,isLoading} = useMutation({
        mutationFn:(data) => updatePassword(data),
        onSuccess:(data) =>{
            console.log(data);
            // queryClient.invalidateQueries({active:true})
            toast.success("password updated successfully");
            

        },
        onError:(err) => {
            console.log(err);
            toast.error(err.message)
        }
    })
    return {mutate,isLoading}

}