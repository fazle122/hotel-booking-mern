import { useMutation, useQuery } from "@tanstack/react-query"
import { createNewCabin, deleteCabin, deleteCabinImage, fetchAvailableCabinData, fetchCabinData, fetchCabinDetail,updateCabinData, uploadCabinImage } from "../../services/cabinService"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { addDays } from "date-fns";



// export function useFetchCabins(){
//     const queryClient = useQueryClient();

//     const {data:cabin,isLoading,isError} = useQuery({
//         queryKey:['cabins'],
//         queryFn:fetchCabinData,
//         onSuccess:(data) =>{
//             console.log(data);
//             queryClient.invalidateQueries({
//                 queryKey:["cabin,bookingDates"]
//             })

//         },
//         onError:(err) => {
//             console.log(err);
//         }
//     })

//     return {cabin,isLoading,isError}
// }




export function useFetchCabins(){
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    let filters = {};

    //Pagination
    const page = !searchParams.get("pageNo") ? 1 : Number(searchParams.get("pageNo"));
    filters['pageNo'] = page;

    //Filter
    const statusFilteredValue = searchParams.get("discount");
    if(!statusFilteredValue || statusFilteredValue !== 'all') filters['discount'] = null;
    if(statusFilteredValue && statusFilteredValue === 'no-discount') filters['discount'] = 0;
    if(statusFilteredValue && statusFilteredValue === 'with-discount') filters['discount[gt]'] = 0

    //Sort
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [key,direction] = sortByRaw.split("-");
    const modifier = direction === 'asc' ?  '' : '-';
    const sortBy = modifier + key;
    filters["sortBy"] = sortBy;

    const {data:cabin,isLoading,isError} = useQuery({
        queryKey:['cabins',page,filters,sortBy],
        queryFn:() => fetchCabinData({filters}),
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






export function useFetchCabinsAvailability(){
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    let filters = {};

    //Pagination
    const page = !searchParams.get("pageNo") ? 1 : Number(searchParams.get("pageNo"));
    filters['pageNo'] = page;

    //Filter
    const statusFilteredValue = searchParams.get("discount");
    if(!statusFilteredValue || statusFilteredValue !== 'all') filters['discount'] = null;
    if(statusFilteredValue && statusFilteredValue === 'no-discount') filters['discount'] = 0;
    if(statusFilteredValue && statusFilteredValue === 'with-discount') filters['discount[gt]'] = 0

    const tempEndDate = searchParams.get("endDate");
    const endDate = addDays(new Date(tempEndDate).setUTCHours(0, 0, 0, 0),1).toISOString();
    const startDate = searchParams.get("startDate");
    if(startDate) filters['startDate[$gte]']= new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)).toISOString();
    if(tempEndDate) filters['endDate[$lt]']= new Date(new Date(endDate).setUTCHours(0, 0, 0, 0)).toISOString();
    console.log(filters);


    //Sort
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [key,direction] = sortByRaw.split("-");
    const modifier = direction === 'asc' ?  '' : '-';
    const sortBy = modifier + key;
    filters["sortBy"] = sortBy;

    const {data:cabin,isLoading,isError} = useQuery({
        queryKey:['top-cabins',page,filters,sortBy],
        queryFn:() => fetchAvailableCabinData({filters}),
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


export function useUploadCabinImage(){
    const queryClient = useQueryClient();

    const {mutate,isLoading,error,isSuccess} = useMutation({
        mutationFn:({id,data}) => uploadCabinImage(id,data),
        onSuccess:(data) => { 
            console.log(data);
            queryClient.invalidateQueries({
                queryKey:["cabins"]
            })
            toast.success('cabin image updated successfully')
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
    });

    return {mutate,isLoading,error,isSuccess};
}

export function useDeleteCabinImage(){
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const {mutate,isLoading,error,isSuccess} = useMutation({
        mutationFn:({id,data}) => deleteCabinImage(id,data),
        onSuccess:(data) => { 
            console.log(data);
            queryClient.invalidateQueries({
                queryKey:["cabins"]
            })
            // navigate('/cabins');
            toast.success('cabin image deleted successfully')
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
    });

    return {mutate,isLoading,error,isSuccess};
}





