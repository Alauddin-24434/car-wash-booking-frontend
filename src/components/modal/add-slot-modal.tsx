import { toast } from "sonner";

import { useState } from "react";
import { useGetAllServicesQuery } from "@/redux/features/service/serviceApi";
import { useCreateSlotMutation } from "@/redux/features/slot/slotApi";

interface AddSlotModalProps {
  toggleModel: () => void;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ toggleModel }) => {
  const { data: servicesData } = useGetAllServicesQuery(undefined);
  const [createSlot] = useCreateSlotMutation();
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("18:00");
  const [serviceError, setServiceError] = useState(false);
  const [showStartTimeOk, setShowStartTimeOk] = useState(false);
  const [showEndTimeOk, setShowEndTimeOk] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServiceError(!service);

    if (!service || !date || !startTime || !endTime) {
      toast.error("All fields are required");
      return;
    }

    const slot = {
      service,
      date,
      startTime,
      endTime,
      isBooked: "available",
    };

    setLoading(true); // Set loading to true when submitting

    try {
      await createSlot(slot).unwrap();
      toast.success("Slot created successfully");
      toggleModel(); // Close modal on success
    } catch (error) {
      toast.error("Failed to save slot");
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl bg-white">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">Add a Slot</p>
          <button onClick={toggleModel} aria-label="Close modal">
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-900 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-6 py-5 bg-gray-50"
        >
          {/* Service Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="service">
            Service
          </label>
        

          {/* Date Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-4 mb-5 bg-white border border-gray-200 rounded shadow-sm"
            required
          />

          {/* Start Time Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="startTime">
            Start Time
          </label>
          <div className="flex items-center mb-5">
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setShowStartTimeOk(true); // Show the OK button when time is changed
              }}
              className="p-4 bg-white border border-gray-200 rounded shadow-sm"
              min="09:00"
              max="18:00"
              required
            />
            {showStartTimeOk && (
              <button
                type="button"
                className="py-4 px-4 text-black border rounded-tr bg-[#fff] text-md transition"
                onClick={() => setShowStartTimeOk(false)} // Hide button when clicked
              >
                OK
              </button>
            )}
          </div>

          {/* End Time Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="endTime">
            End Time
          </label>
          <div className="flex items-center mb-5">
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setShowEndTimeOk(true); // Show the OK button when time is changed
              }}
              className="p-4 bg-white border border-gray-200 rounded shadow-sm"
              min="09:00"
              max="18:00"
              required
            />
            {showEndTimeOk && (
              <button
                type="button"
                className="py-4 px-4 text-black border rounded-tr bg-[#fff] text-md transition"
                onClick={() => setShowEndTimeOk(false)} // Hide button when clicked
              >
                OK
              </button>
            )}
          </div>

          <hr />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={toggleModel}
              className="text-gray-600 font-semibold"
              disabled={loading} // Disable cancel button when loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition cursor-pointer"
              disabled={loading} // Disable submit button during loading
            >
              {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlotModal;