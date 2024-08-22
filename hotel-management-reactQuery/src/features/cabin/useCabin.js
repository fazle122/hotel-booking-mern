import { useMutation, useQuery } from "@tanstack/react-query"
import { createNewCabin, deleteCabin, fetchCabinData, fetchCabinDetail, updateCabinData } from "../../services/cabinService"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";



export function useFetchCabins(){
    const queryClient = useQueryClient();

    const {data:cabin,isLoading,isError} = useQuery({
        queryKey:['cabins'],
        queryFn:fetchCabinData,
        onSuccess:(data) =>{
            console.log(data);
            queryClient.invalidateQueries({
                queryKey:["cabin,bookingDates"]
            })

        },
        onError:(err) => {
            console.log(err);
        }
    })

    return {cabin,isLoading,isError}
}


export function useFetchCabinDetail(){
    const { id } = useParams();
    const {data,isLoading,isError,isFetching} = useQuery({
        invalidateQueries : true,
        queryKey:['cabin',id],
        queryFn:() => fetchCabinDetail(id),
        refetchOnWindowFocus: true,
        // retry:false,
        // staleTime:0,
        onSuccess:(data) =>{
            console.log(data);

        },
        onError:(err) => {
            console.log(err);
        }
    },)

    return {data,isLoading,isError,isFetching}
}


export function useCreateNewCabin(){

    const queryClient = useQueryClient();

    const{mutate:createNew,isPending} = useMutation({
        mutationFn:(data) => createNewCabin(data),
        onSuccess:() => { 
            console.log('cabin deleted');
            queryClient.invalidateQueries({
                queryKey:["cabins"]
            })
            toast.success('new cabin created successfully')
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
        
    });
    return {createNew,isPending};
}

export function useUpdateCabin(){

    const queryClient = useQueryClient();

    const{mutate:updateCabin,isPending} = useMutation({
        mutationFn:({id,cabinData}) => updateCabinData({id,cabinData}),
        onSuccess:(data) => { 
            console.log('cabin edited');
            console.log(data);
            queryClient.invalidateQueries({
                queryKey:["cabins"]
            })
            toast.success('cabin updated successfully')
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
        
    });

    return {updateCabin,isPending};
}


export function useDeleteCabin(){

    const queryClient = useQueryClient();

    const {data,isLoading,mutate} = useMutation({
        mutationFn:(id) => deleteCabin(id),
        onSuccess:() => { 
            console.log('cabin deleted');
            queryClient.invalidateQueries({
                queryKey:["cabins"]
            })
            toast.success('cabin deleted successfully')
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
    });

    return {data,isLoading,mutate};
}


