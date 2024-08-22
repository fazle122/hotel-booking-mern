import { useQuery} from "@tanstack/react-query";
import { getSettingsData } from "../../services/settingsService";



export function useFetchSettingsData(){
   

    const {data: settings,isLoading,error,isFetching} = useQuery({
      queryKey: ["settings",],
      queryFn:getSettingsData,
      // retry: false,
    });
  
    return { settings, isLoading, error,isFetching };
}