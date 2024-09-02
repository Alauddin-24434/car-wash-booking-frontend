import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useGetAvailableSlotsQuery } from "../../redux/features/slot/slotApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  SelectedSlot, selectSelectedSlots, toggleSlot } from "../../redux/features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";
import './FindSlot.css'

interface Slot {
  _id: string;
  time: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked";
}

interface ApiError {
  data?: {
    message?: string;
  };
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const FindSlot: React.FC<{ serviceId: string, serviceName: string }> = ({ serviceId, serviceName }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedSlots = useAppSelector(selectSelectedSlots);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = Array.isArray(value)
    ? value.map((date) => date && formatDate(date)).join(" to ")
    : value && formatDate(value);

  const date = formattedDate?.toString();

  const { data: slots, error, isLoading } = useGetAvailableSlotsQuery({
    serviceId,
    date,
  });

  useEffect(() => {
    if (slots) {
      setAvailableSlots(slots.data);
    }
  }, [slots]);

  const handleCheckboxChange = (
    slotId: string,
    isBooked: "available" | "booked",
    startTime: string,
    endTime: string
  ) => {
    if (isBooked === "available") {
      const slot: SelectedSlot = {
        serviceId,
        slotId,
        serviceName,
        startTime,
        endTime,
        date: formattedDate || "",
        status: "upcoming",
      };

      // Dispatch action to toggle slot
      dispatch(toggleSlot(slot));
    }
  };

  const handleNavigate = () => {
    navigate('/booking');
  };
  // const handleClearSlots = () => {
  //   dispatch(clearSelectedSlots());
  // };

  const isConfirmEnabled = selectedSlots.length > 0;

  return (
    <div className="slot-selection">
      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className="available-time-slots">
        {formattedDate && (
          <div className="selected-date">
            <p className="text-gray-800">Selected Date: {date}</p>
          </div>
        )}
        {isLoading && <p>Loading slots...</p>}
        {error && (
          <p className="text-red-500 h-[245px] border flex justify-center items-center">
            {(error as ApiError).data?.message}
          </p>
        )}
        {!error && availableSlots.length > 0 && (
          <table className="w-full border-collapse bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 border-b border-gray-300">
                <th className="p-3 font-bold uppercase">Time Slot</th>
                <th className="p-3 font-bold uppercase">Availability</th>
                <th className="p-3 font-bold uppercase">Select</th>
              </tr>
            </thead>
            <tbody>
              {availableSlots.map((slot) => (
                <tr
                  key={slot._id}
                  className={`hover:bg-gray-100 ${
                    slot.isBooked === "booked"
                      ? "text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  style={{
                    cursor:
                      slot.isBooked === "available" ? "pointer" : "not-allowed",
                  }}
                >
                  <td className="p-3 border-b border-gray-300 text-center">
                    {slot.startTime} - {slot.endTime}
                  </td>
                  <td className="p-3 border-b border-gray-300 text-center">
                    <span
                      className={`rounded py-1 px-3 text-xs font-bold ${
                        slot.isBooked === "available"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {slot.isBooked === "available"
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-300 text-center">
                    <input
                      type="checkbox"
                      checked={selectedSlots.some((selected) => selected.slotId === slot._id)}
                      onChange={() =>
                        handleCheckboxChange(slot._id, slot.isBooked, slot.startTime, slot.endTime)
                      }
                      disabled={slot.isBooked === "booked"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 text-right">
          <button
            className={`py-2 px-4 font-bold rounded ${
              isConfirmEnabled
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleNavigate}
            disabled={!isConfirmEnabled}
          >
            Go To Booking Page
          </button>
          {/* <button
            className="py-2 px-4 font-bold rounded bg-red-500 text-white hover:bg-red-700 mt-2"
            onClick={handleClearSlots}
          >
            Clear Selected Slots
          </button> */}
        </div>
        </div>
    
    </div>
  );
};
