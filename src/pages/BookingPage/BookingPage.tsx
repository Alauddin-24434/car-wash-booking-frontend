import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { selectSelectedSlots } from "../../redux/features/booking/bookingSlice";


// Fake JSON data
const fakeSelectedService = {
  image: "https://via.placeholder.com/150",
  name: "Premium Car Wash",
  description: "A thorough car wash with waxing and interior cleaning."
};

const fakeSelectedSlot = "02:00 PM";

// Simulated API response
const fakeApiResponse = {
  success: true,
  paymentUrl: "https://aamarpay.example.com/checkout"
};

const BookingPage = () => {

  const selectedSlotIds = useAppSelector(selectSelectedSlots);

  console.log("selectedSlotIds",selectedSlotIds)

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handlePayment = async () => {
    // Simulate API call to initiate payment process
    try {
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use the fake API response
      const data = fakeApiResponse;

      if (data.success) {
        // Redirect to AAMARPAY payment page
        window.location.href = data.paymentUrl;
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Left Side: Service and Time Slot */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Selected Service</h2>
     
        <div className="flex items-center gap-4 mb-4">
          <img src={fakeSelectedService.image} alt={fakeSelectedService.name} className="w-24 h-24 object-cover rounded-md" />
          <div>
            <h3 className="text-xl font-semibold">{fakeSelectedService.name}</h3>
            <p className="text-gray-600">{fakeSelectedService.description}</p>
            <p className="mt-2 text-gray-800">
              <FaRegClock className="inline mr-2" />
              Time Slot: {fakeSelectedSlot}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: User Information Form */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-lg">
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
          <div>
            <label htmlFor="selectedSlot" className="block text-gray-700">Time Slot</label>
            <input
              type="text"
              id="selectedSlot"
              value={fakeSelectedSlot}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
