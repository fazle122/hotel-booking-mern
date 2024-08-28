import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useReservation } from "../../components/ReservationContext";
import toast from "react-hot-toast";
import { useCreateBooking, useCreateBookingWithPayment } from "./useBooking";

export default function ConfirmBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    numOfGuests,
    numOfNights,
    startDate,
    endDate,
    cabinPrice,
    totalPrice,
    user,
    cabin,
  } = location.state;

  const {resetRange} = useReservation();
  const [paymentOption, setPaymentOption] = useState();
  const { mutate: createBooking, isPending:isCreateLoading } = useCreateBooking();
  // const {updateBooking} = useUpdateBooking();
  const { mutate:makePayment,isPending:isPaymentLoading} = useCreateBookingWithPayment();

  const handlePaymentOption = (event) => {
    setPaymentOption(event.target.value);
  };

  const handlePayment = (event) => {
    if (!paymentOption) {
      toast.error("please select payment options");
    }else if (paymentOption === "now") {
      event.preventDefault();
      makePayment(location.state);
      resetRange();
    } else {
      console.log(location.state);
      createBooking(location.state);
      resetRange();
    }
  };

  // const total = !addBreakfast ?bookingData.totalPrice : bookingData.totalPrice + totalBreakfastPrice;

  return (
    <div className="px-4 py-4">
      <div className="py-4 flex space-x-12 justify-between">
        <button
          onClick={() => navigate(-1)}
          className="rounded-md bg-black text-white h-8 px-2"
        >
          {" "}
          {`<-- Back`}
        </button>
      </div>
      <div className="grid grid-cols-2 px-2 py-2 rounded-md bg-white">
        <div>
          <div className="flex justify-between rounded-t-md h-12 text-xl">
            <p>{` ${numOfNights} nights in ${cabin.name}`}</p>
          </div>
          <div className="py-4">
            <h1 className="underline">Guest detail</h1>
            <p>{`Guest name :  ${user.name}`}</p>
            <p>{`Email address :  ${user.email}`}</p>
          </div>
          <div className="py-4">
            <h1 className="underline">Booking detail</h1>
            <p>{`Check in:  ${format(new Date(startDate), "yyyy-MM-dd")}`}</p>
            <p>{`Check out:  ${format(new Date(endDate), "yyyy-MM-dd")}`}</p>
            <p>{`Num of guest :  ${numOfGuests}`}</p>
            {/* <p>{`Breakfast :  ${bookingData.hasBreakfast ? "Included" : "Not-included"}`}</p> */}
            <p>{`cabin price:  ${cabinPrice}`}</p>
            {/* <p>{`Total price:  ${!bookingData.hasBreakfast ? bookingData.totalPrice : bookingData.totalPrice + totalBreakfastPrice }`}</p> */}
            <p>{`Total price:  ${totalPrice}`}</p>
          </div>

          {/* <div className="px-12 py-4 flex justify-between">
                  
                    {   bookingData.status === 'booked'  &&
                        <button className={`bg-red-300 px-1 py-1 border rounded-md`} onClick={handleOpen}>Delete booking</button>
                    }
                  

                </div> */}
        </div>
        <div>
          <div>
            <h1 className="underline">Payment option</h1>
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={paymentOption}
                  onChange={handlePaymentOption}
                >
                  <FormControlLabel
                    value="now"
                    control={<Radio />}
                    label="Pay now"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Pay at hotel"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div>
            <button
              onClick={handlePayment}
              disabled={isCreateLoading || isPaymentLoading}
              className="px-2 py-1 rounded-md bg-black text-white"
            >
              Confirm booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
