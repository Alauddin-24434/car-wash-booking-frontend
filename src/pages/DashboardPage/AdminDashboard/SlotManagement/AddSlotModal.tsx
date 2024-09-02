import { toast } from "sonner";
import { useCreateSlotMutation } from "../../../../redux/features/slot/slotApi";
import { useState } from "react";
import { useGetAllServicesQuery } from "../../../../redux/features/service/serviceApi";
import CustomDropdown from "./CustomDropdown"; // Adjust the import path as needed

interface Service {
  _id: string;
  name: string;
  image: string; // Added image field
}

interface AddSlotModalProps {
  toggleModel: () => void;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ toggleModel }) => {
  const { data: servicesData, error: servicesError, isLoading: servicesLoading } = useGetAllServicesQuery(undefined);
  const [createSlot, { data, error, isError, isLoading }] = useCreateSlotMutation();
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isBooked, setIsBooked] = useState<"available" | "booked" | "canceled">("available");
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] = useState<boolean>(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState<boolean>(false);
  const [serviceError, setServiceError] = useState(false); // State for service field error

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    setServiceError(!service); // Set error state based on service selection

    if (!service || !date || !startTime || !endTime) {
      toast.error("All fields are required");
      return;
    }

    if (!service) {
      toast.error("Please select a service");
      return;
    }

    const slot = {
      service,
      date,
      startTime,
      endTime,
      isBooked,
    };

    console.log("Submitting slot:", slot);

    try {
      const result = await createSlot(slot).unwrap();
      console.log("Slot created successfully:", result);
      toggleModel(); // Close modal on successful submission
    } catch (error) {
      console.error("Failed to save slot:", error);
      toast.error("Failed to save slot");
    }
  };

  // Log API response and errors for debugging
  if (data) {
    console.log("API Response Data:", data);
  }

  if (isError && error) {
    console.error("API Error:", error);
  }

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
          <CustomDropdown
            options={servicesData?.data || []}
            selectedValue={service}
            onSelect={(value) => setService(value)}
            hasError={serviceError} // Pass error state to CustomDropdown
          />

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
          <div className="relative">
            <input
              id="startTime"
              type="text"
              value={startTime}
              onClick={() => setIsStartTimePickerOpen(true)}
              readOnly
              className="p-4 mb-5 bg-white border border-gray-200 rounded shadow-sm"
              placeholder="Select start time"
            />
            {isStartTimePickerOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 shadow-lg">
                {/* Time picker component goes here */}
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setIsStartTimePickerOpen(false);
                  }}
                  className="p-2 border rounded"
                />
              </div>
            )}
          </div>

          {/* End Time Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="endTime">
            End Time
          </label>
          <div className="relative">
            <input
              id="endTime"
              type="text"
              value={endTime}
              onClick={() => setIsEndTimePickerOpen(true)}
              readOnly
              className="p-4 mb-5 bg-white border border-gray-200 rounded shadow-sm"
              placeholder="Select end time"
            />
            {isEndTimePickerOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 shadow-lg">
                {/* Time picker component goes here */}
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    setIsEndTimePickerOpen(false);
                  }}
                  className="p-2 border rounded"
                />
              </div>
            )}
          </div>

          {/* Status Field */}
          <label className="mb-2 font-semibold text-gray-700" htmlFor="isBooked">
            Status
          </label>
          <select
            id="isBooked"
            value={isBooked}
            onChange={(e) => setIsBooked(e.target.value as "available" | "booked" | "canceled")}
            className="p-4 mb-5 bg-white border border-gray-200 rounded shadow-sm"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="canceled">Canceled</option>
          </select>

          <hr />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={toggleModel}
              className="text-gray-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
          {/* Footer content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default AddSlotModal;
