import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import { useState, useEffect } from "react"; // Import React hooks
import Calendar from "react-calendar"; // Import Calendar component from react-calendar
import "./FindSlot.css"; // Import custom CSS for styling
import { useGetAvailableSlotsQuery } from "../../redux/features/slot/slotApi"; // Import your API hook
import { useAppDispatch,  } from "../../redux/hooks";
import { setSelectedSlots } from "../../redux/features/booking/bookingSlice"; // Adjust import as needed
import { useNavigate } from "react-router-dom";

// Define Slot and Error interfaces
interface Slot {
  _id: string; // Unique identifier for each slot
  time: string; // Time of the slot, e.g., "09:00 AM"
  startTime: string; // Start time of the slot, e.g., "09:00"
  endTime: string; // End time of the slot, e.g., "10:00"
  isBooked: "available" | "booked"; // Booking status of the slot
}

interface ErrorData {
  message: string; // Error message
}

interface ApiError {
  data: ErrorData; // Error details
}

type ValuePiece = Date | null; // Type for date or null
type Value = ValuePiece | [ValuePiece, ValuePiece]; // Type for single date or date range

export const FindSlot = ({ serviceId }: { serviceId: string }) => {
  const [value, onChange] = useState<Value>(new Date()); // State to manage selected date
  const [selectedSlotsId, setSelectedSlotsId] = useState<string[]>([]); // State to manage selected time slots
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]); // State to manage available time slots
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Convert selected date to string format YYYY-MM-DD
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

  // Fetch available slots based on serviceId and selected date
  const { data: slots, error, isLoading } = useGetAvailableSlotsQuery({
    serviceId,
    date,
  });

  // Update available slots when the API response changes
  useEffect(() => {
    if (slots) {
      setAvailableSlots(slots.data);
    }
  }, [slots, date]);

  // Handle checkbox change to select or deselect time slots
  const handleCheckboxChange = (
    slotId: string,
    isBooked: "available" | "booked"
  ) => {
    if (isBooked === "available") {
      setSelectedSlotsId((prev) =>
        prev.includes(slotId)
          ? prev.filter((id) => id !== slotId) // Deselect slot
          : [...prev, slotId] // Select slot
      );
    }
  };

  // Save final selection to Redux state when button is clicked
  const handleSubmitedSlots = () => {
    dispatch(setSelectedSlots({ serviceId, slotIds: selectedSlotsId }));
    navigate('/booking');
  };

  // Check if any slots are selected to enable the book button
  const isConfirmEnabled = selectedSlotsId.length > 0;

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
                      checked={selectedSlotsId.includes(slot._id)}
                      onChange={() =>
                        handleCheckboxChange(slot._id, slot.isBooked)
                      }
                      disabled={slot.isBooked === "booked"}
                      className={`cursor-pointer ${
                        slot.isBooked === "booked"
                          ? "text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
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
            onClick={handleSubmitedSlots}
          >
            Book This Service
          </button>
        </div>
      </div>
    </div>
  );
};
