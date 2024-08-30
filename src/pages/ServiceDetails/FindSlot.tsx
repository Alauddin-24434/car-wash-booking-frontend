import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import { useState, useEffect } from "react"; // Import React useState and useEffect hooks
import Calendar from "react-calendar"; // Import Calendar component from react-calendar
import './FindSlot.css'; // Import custom CSS for styling

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Example time slot data
const timeSlots = [
  { time: '09:00 AM', isAvailable: "booked" },
  { time: '10:00 AM', isAvailable: "available" },
  { time: '11:00 AM', isAvailable: "booked" },
  { time: '01:00 PM', isAvailable: "available" },
];

export const FindSlot = () => {
  const [value, onChange] = useState<Value>(new Date()); // State to manage selected date
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set()); // State to manage selected time slots
  const [availableSlots, setAvailableSlots] = useState<typeof timeSlots>(timeSlots); // State to manage available time slots

  useEffect(() => {
    // Logic to update available slots based on selected date
    // Here, you would typically fetch the available slots for the selected date from an API
    // For this example, we'll use static time slots
    const today = formatDate(new Date());
    const slotsForToday = timeSlots; // Mock fetching slots for the selected date
    setAvailableSlots(slotsForToday);
  }, [value]); // Trigger effect when date changes

  // Function to convert Date object to "YYYY-MM-DD" format
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Check if value is a single date or a range and convert accordingly
  const formattedDate = Array.isArray(value)
    ? value.map((date) => date && formatDate(date)).join(" to ")
    : value && formatDate(value);

  const date = formattedDate?.toString();

  // Handle checkbox selection
  const handleCheckboxChange = (time: string, isAvailable: string) => {
    if (isAvailable === "available") {
      setSelectedSlots(prev => {
        const updated = new Set(prev);
        if (updated.has(time)) {
          updated.delete(time);
        } else {
          updated.add(time);
        }
        return updated;
      });
    }
  };

  // Determine if the book button should be enabled
  const isConfirmEnabled = selectedSlots.size > 0;

  // Handle hover alert function
  const handleMouseEnter = () => {
    if (!isConfirmEnabled) {
      alert("Please confirm the slots before booking.");
    }
  };

  return (
    <div className="slot-selection">
      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} /> {/* Calendar component */}
      </div>
      <div className="available-time-slots">
        {formattedDate && (
          <div className="selected-date">
            <p className="text-gray-800">Selected Date: {date}</p> {/* Display selected date */}
          </div>
        )}
        <table className="w-full border-collapse bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 border-b border-gray-300">
              <th className="p-3 font-bold uppercase">Time Slot</th>
              <th className="p-3 font-bold uppercase">Availability</th>
              <th className="p-3 font-bold uppercase">Select</th>
            </tr>
          </thead>
          <tbody>
            {availableSlots.map((slot, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${slot.isAvailable === 'booked' ? 'text-gray-400 cursor-not-allowed' : ''}`}
                style={{ cursor: slot.isAvailable === 'available' ? 'pointer' : 'not-allowed' }}
              >
                <td className="p-3 border-b border-gray-300 text-center">{slot.time}</td>
                <td className="p-3 border-b border-gray-300 text-center">
                  <span
                    className={`rounded py-1 px-3 text-xs font-bold ${
                      slot.isAvailable === 'available' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {slot.isAvailable === 'available' ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-300 text-center">
                  <input
                    type="checkbox"
                    checked={selectedSlots.has(slot.time)}
                    onChange={() => handleCheckboxChange(slot.time, slot.isAvailable)}
                    disabled={slot.isAvailable === 'booked'}
                    className={`cursor-pointer ${slot.isAvailable === 'booked' ? 'text-gray-400 cursor-not-allowed' : ''}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Book button */}
        <div className="mt-4 text-right">
          <button
            className={`py-2 px-4 font-bold rounded ${isConfirmEnabled ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            onClick={() => {
              if (isConfirmEnabled) {
                alert(`Booked slots: ${Array.from(selectedSlots).join(', ')} on ${date}`);
              }
            }}
            onMouseEnter={handleMouseEnter} // Show alert on hover if disabled
            disabled={!isConfirmEnabled} // Disable button when isConfirmEnabled is false
          >
            Book These Slots
          </button>
        </div>
      </div>
    </div>
  );
};
