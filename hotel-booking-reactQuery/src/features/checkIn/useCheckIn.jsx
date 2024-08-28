import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../../services/bookingService";

export function useMakePayment() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createPayment(data),
    onSuccess: (data) => {
      console.log(data?.data?.url);
      window.location.replace(data?.data?.url);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
}
