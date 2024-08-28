/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "../features/bookings/useBooking";
import { useState } from "react";
import Modal from "./Modal";
import { useGetLoggedUser } from "../features/authentication/useAuth";
import { format } from "date-fns";

export default function BookingRow({ booking,forDashBoard }) {
  const { user } = useGetLoggedUser();
  const [open, setOpen] = useState(false);
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  function handleNavigateToDetail() {
    navigate(`/bookings/${booking._id}`);
  }

  // function handleNavigateToCheckIn() {
  //   navigate(`/checkIn/${booking._id}`);
  // }

  function handleDelete() {
    deleteBooking({id:booking._id,data:{cabinId:booking.cabin._id}});
  }

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <tr
        key={booking._id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td className="px-6 py-4">{booking.cabin.name}</td>
        {user.isAdmin && <td className="px-6 py-4">{booking.user.name}</td>}
        <td className="px-6 py-4">{booking.status}</td>
        <td className="px-6 py-4">{format(new Date(booking.startDate), "yyyy-MM-dd")}</td>
        <td className="px-6 py-4">{format(new Date(booking.endDate), "yyyy-MM-dd")}</td>
        {!forDashBoard && <td className="px-6 py-4">${booking.totalPrice}</td>}
        {!forDashBoard && <td className="px-6 py-4">{booking.numOfGuests}</td>}
        <td className="px-6 py-4 space-x-4">
          {/* {user.isAdmin && <div>
            {booking.status !== "checkedin" &&
              booking.status !== "checkedout" && (
                <button
                  disabled={isDeleting}
                  className={`${
                    isDeleting ? "bg-gray-500" : "bg-white"
                  } px-1 py-1 border rounded-md`}
                  // onClick={handleNavigateToCheckIn}
                  onClick={handleNavigateToDetail}  

                >
                  Check In
                </button>
              )}

            {booking.status === "checkedin" && (
              <button
                disabled={isDeleting}
                className={`${
                  isDeleting ? "bg-gray-500" : "bg-white"
                } px-1 py-1 border rounded-md`}
                // onClick={handleNavigateToCheckIn}
                onClick={handleNavigateToDetail}

              >
                Check Out
              </button>
            )}
          </div>} */}
          <button
            disabled={isDeleting}
            className={`${
              isDeleting ? "bg-gray-500" : "bg-white"
            } px-1 py-1 border rounded-md`}
            onClick={handleNavigateToDetail}
          >
            View
          </button>

          {booking.status === "booked" && (
            <button
              disabled={isDeleting}
              className={`${
                isDeleting ? "bg-gray-500" : "bg-white"
              } px-1 py-1 border rounded-md`}
              onClick={handleOpen}
            >
              Delete
            </button>
          )}

          <Modal
            title={"Delete confirmation"}
            isOpen={open}
            handleOpen={handleOpen}
          >
            <div className="flex flex-col items-center justify-center space-y-8">
              <p>Are you sure, you want to delete this booking?</p>
              <div className="space-x-4">
                <button
                  disabled={isDeleting}
                  className="px-2 py-1 border-4 rounded-md bg-red-500 text-white"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        </td>
      </tr>
    </>
  );
}
