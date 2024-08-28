/* eslint-disable react/prop-types */
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
    return (
      range.from &&
      range.to &&
      datesArr.some((date) =>
        isWithinInterval(date, { start: range.from, end: range.to })
      )
    );
  }


export default function DateSelector({settings,cabin,bookedDates}){
    
    console.log('bookedDates',bookedDates);

    const {minBookingLength,maxBookingLength} = settings;
    const {regularPrice,discount} = cabin;

    const {range,setRange,resetRange} = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

    const numOfNights = differenceInDays(range.to,range.from);

    const cabinPrice = numOfNights * ( regularPrice - discount)





    return (
        <div className="mx-2 px-2 py-2 bg-white max-w-fit">
            <DayPicker
                
                className="pt-12 place-self-center"
                mode="range"
                onSelect={setRange}
                selected={displayRange}
                min={minBookingLength}
                max={maxBookingLength}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={2}
                disabled={(curDate) =>
                  isPast(curDate) ||
                  bookedDates.some((date) => isSameDay(date, curDate))
                }
            />

            <div className="flex items-center justify-between px-8 bg-gray-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                <p className="flex gap-2 items-baseline">
                    {discount > 0 ? (
                    <>
                        <span className="text-2xl">${regularPrice - discount}</span>
                        <span className="line-through font-semibold text-primary-700">
                        ${regularPrice}
                        </span>
                    </>
                    ) : (
                    <span className="text-2xl">${regularPrice}</span>
                    )}
                    <span className="">/night</span>
                </p>
                {numOfNights ? (
                    <>
                        <p className="bg-accent-600 px-3 py-2 text-2xl">
                            <span>&times;</span> <span>{numOfNights}</span>
                        </p>
                        <p>
                            <span className="text-lg font-bold uppercase">Total</span>{" "}
                            <span className="text-2xl font-semibold">${cabinPrice}</span>
                        </p>
                    </>
                ) : null}
                </div>

                {range.from || range.to ? (
                <button
                    className="border border-primary-800 py-2 px-3 text-sm font-semibold"
                    onClick={resetRange}
                >
                    Clear
                </button>
                ) : null}
            </div>
        </div>

    );

}