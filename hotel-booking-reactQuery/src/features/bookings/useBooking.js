
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {addDays, subDays} from 'date-fns'
import { createBooking, deleteBookingData, fetchAllBookings, fetchBookedDates, fetchBookingDetal, updateBookingData } from '../../services/bookingService'
import toast from "react-hot-toast";
import {  useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useMakePayment} from "../checkIn/useCheckIn"


export function useFetchAllBookings(){
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    let filters = {};

    //Pagination
    const page = !searchParams.get("pageNo") ? 1 : Number(searchParams.get("pageNo"));
    filters['pageNo'] = page;

    //Filter
    const statusFilteredValue = searchParams.get("status");
    if(!statusFilteredValue || statusFilteredValue !== 'all') filters["status"] = statusFilteredValue;
    const countFilteredValue = searchParams.get("numOfGuests");
    if(!countFilteredValue || countFilteredValue !== 'all') filters["numOfGuests"] = countFilteredValue;

    // let filters = [];
    // const statusFilteredValue = searchParams.get("status");
    // const statusFilter = !statusFilteredValue || statusFilteredValue === 'all' ? null : {key:"status",value:statusFilteredValue}
    // filters.push(statusFilter);
    // const countFilteredValue = searchParams.get("numOfGuests");
    // const guestCountFilter = !countFilteredValue || countFilteredValue === 'all' ? null : {key:"numOfGuests",value:countFilteredValue }
    // filters.push(guestCountFilter);
   

  
    //Sort
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [key,direction] = sortByRaw.split("-");
    const modifier = direction === 'asc' ?  '' : '-';
    const sortBy = modifier + key;
    filters["sortBy"] = sortBy;


    // const {data:{ data: bookings, count } = {},isLoading,isError} = useQuery({
    const {data:bookings,isLoading,isError} = useQuery({
        queryKey:['bookings',page,filters,sortBy],
        queryFn:() => fetchAllBookings({filters}),
        onSuccess:(data) =>{
            console.log(data);
        },
        onError:(err) =>{
            console.log(err);
        }
    });

    let pages;
    if(bookings !== undefined){
        pages = bookings.data.pages;
    }
    console.log(pages);

    if (page < pages)
        queryClient.prefetchQuery({
          queryKey: ["bookings", page + 1,filters, ],
          queryFn: () => fetchAllBookings({ filters}),
        });

    // if(page > 1){
    //     filters['pageNo'] = page - 1;
    //     queryClient.prefetchQuery({
    //         queryKey:['bookings',page - 1,filters],
    //         queryFn:() => fetchAllBookings({filters}),
    //     })
    // }

    return {bookings,isLoading,isError}
}


export function useGetBookingDetail(){

    const { id } = useParams();

    const {
      data: booking,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["booking", id],
      queryFn: () => fetchBookingDetal(id),
    //   retry: false,
    });
  
    return { booking, isLoading, error };
}

export function useFetchBookedDates(){
    // const queryClient = useQueryClient();
    const {id} = useParams();
    const {data,isLoading,isFetching} = useQuery({
        queryKey:['bookingDates',id],
        queryFn:() => fetchBookedDates(id),
        // retry:false,
        // staleTime:0,
        onSuccess:(data) =>{
            console.log(data);
            // queryClient.invalidateQueries({ active: false });
        },
        onError:(err) => {
            console.log(err);
        }

    })

    return {data,isLoading,isFetching}
}


export function useCreateBooking(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate,isPending} = useMutation({
        mutationFn:(data) => createBooking(data),
        onSuccess:(data) =>{
            console.log(data);
            queryClient.invalidateQueries({queryKey:['bookings']});
            navigate('/bookings')
            toast.success("booking created successfully")
        },
        onError:(err) =>{
            console.log(err);
            toast.err("booking cannot be created")

        }
    });

    return {mutate,isPending}
}



export function useCreateBookingWithPayment(){
    const {mutate:makePayment} = useMakePayment()
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const {mutate,isPending} = useMutation({
        mutationFn:(data) => createBooking(data),
        onSuccess:(data) =>{
            console.log(data?.data?._id);
            console.log(data?.data?.totalPrice);
            queryClient.invalidateQueries({queryKey:['bookings']});
            const paymentData = {
                bookingId:data?.data?._id,
                totalPrice: data?.data?.totalPrice
              };
            makePayment(paymentData);
        },
        onError:(err) =>{
            console.log(err);
            toast.err("booking cannot be created")

        }
    });

    return {mutate,isPending}
}



export function useUpdateBooking(){
    const queryClient = useQueryClient();
    const { id } = useParams();

    const{mutate,isPending} = useMutation({
        mutationFn:({data}) => updateBookingData(id,data),
        onSuccess:(data) => { 
            // queryClient.invalidateQueries({
            //     queryKey:["bookings","booking"]
            // })
            queryClient.invalidateQueries({ active: true });

            console.log(data);
            toast.success(`booking #${data.data.data._id} updated successfully`)
        },
        onError:(error) => {
            console.log(error);
            toast.error(error.message)
        }
        
    });

    return {mutate,isPending};
}


export function useDeleteBooking(){
    const queryClient = useQueryClient();
    const {mutate,isPending} = useMutation({
        mutationFn:({id,data}) => deleteBookingData(id,data),
        onSuccess:(data) =>{
            console.log(data);
            queryClient.invalidateQueries({
                queryKey:['bookings']
            });
            toast.success("booking deleted successfully")
        },
        onError:(err) =>{
            console.log(err);
            toast.err("booking cannot be deleted")

        }
    });

    return {mutate,isPending}
}


export function useFilterBookings(){
    let filters = {};
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const startDate = subDays(new Date(),numDays).toISOString() ;
    const endDate = new Date().toISOString();
    filters['startDate[gte]']=startDate;
    filters['startDate[lte]']=endDate;

    const {data,isLoading,isFetching} = useQuery({
        queryKey:['bookings',numDays],
        queryFn:() => fetchAllBookings({filters}),
        retry:false,
        onSuccess:(data) =>{
            console.log(data);
        },
        onError:(err) =>{
            console.log(err);
        }
    });

    return {data,isLoading,isFetching}
}




export function useFetchTodaysBookings(){
    const [searchParams] = useSearchParams();
    let filters = {};

    //Pagination
    const page = !searchParams.get("pageNo") ? 1 : Number(searchParams.get("pageNo"));
    filters['pageNo'] = page;

    //Filter
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
    const tomorrow = addDays(new Date().setUTCHours(0, 0, 0, 0),1).toISOString();
    filters['status'] = ['checkedin','checkedout'];
    filters['startDate[gte]']=today;
    filters['startDate[lt]']=tomorrow;
    // filters['endDate[gte]']=today;
    // filters['endDate[lt]']=tomorrow;


    const {data:bookings,isLoading,} = useQuery({
        queryKey:['current-bookings',page,filters],
        queryFn:() => fetchAllBookings({filters}),
        onSuccess:(data) =>{
            console.log(data);
        },
        onError:(err) =>{
            console.log(err);
        }
    });

    return {bookings,isLoading}
}




