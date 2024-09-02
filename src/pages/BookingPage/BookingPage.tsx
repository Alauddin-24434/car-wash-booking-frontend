// src/components/BookingPage.tsx
import { useState, useEffect } from "react";
import {  FaTrashAlt } from "react-icons/fa"; // Import the trash icon
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { SelectedSlot, selectSelectedSlots, removeSlot } from "../../redux/features/booking/bookingSlice";
import useCurrentUser from "../../utils/hooks/useCurrentUser";

// Define TypeScript types for the fake data
interface ApiResponse {
  success: boolean;
  paymentUrl: string;
}

const BookingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useCurrentUser();
  const bookingSlotsDataFromState: SelectedSlot[] = useAppSelector(selectSelectedSlots);

  // Initialize state with fallback values
  const [userName, setUserName] = useState(userData?.name || "");
  const [userEmail, setUserEmail] = useState(userData?.email || "");
  const [selectedService, setSelectedService] = useState<SelectedSlot[]>([]);

  useEffect(() => {
    // Update state when userData changes
    if (userData) {
      setUserName(userData.name || "");
      setUserEmail(userData.email || "");
    }

    // Set selected services from state or fallback values
    if (bookingSlotsDataFromState.length > 0) {
      setSelectedService(bookingSlotsDataFromState);
    }
  }, [userData, bookingSlotsDataFromState]);

  const handlePayment = async () => {
    // Simulate API call to initiate payment process
    try {
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated API response
      const data: ApiResponse = {
        success: true,
        paymentUrl: "https://aamarpay.example.com/checkout",
      };

      if (data.success) {
        // Redirect to payment page
        window.location.href = data.paymentUrl;
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleRemoveSlot = (slotId: string, serviceId: string) => {
    dispatch(removeSlot({ slotId, serviceId }));
  };
  const isConfirmEnabled = selectedService.length > 0;
  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Left Side: Service and Time Slot */}
      <div className="w-full md:w-1/2 bg-white flex flex-col gap-4 p-4 shadow-lg rounded-lg">
        {selectedService.length > 0 ? (
          selectedService.map((ser, index) => (
            <div key={index} className="flex items-center gap-4 p-2 border rounded-md">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{ser?.serviceName}</h3>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-gray-800">Date: {ser?.date}</p>
                  <p className="text-gray-800">
                    Time: {ser?.startTime} - {ser?.endTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveSlot(ser.slotId, ser.serviceId)}
                className="text-red-500 hover:text-red-700 mr-4"
                aria-label="Remove slot"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full p-4">
            <p className="text-gray-500">No service or slot selected.</p>
          </div>
        )}
      </div>

      {/* Right Side: User Information Form */}
      <div className="w-full md:w-1/2 bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
        
          <button
            className={`py-2 px-4 font-bold rounded ${
              isConfirmEnabled
                ? "w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handlePayment}
            disabled={!isConfirmEnabled}
          >
                   Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
