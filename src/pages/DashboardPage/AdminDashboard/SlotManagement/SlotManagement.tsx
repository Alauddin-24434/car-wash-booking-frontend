import React, { useState, useEffect } from "react";
import AddSlotModal from "./AddSlotModal";
import { useGetAllSlotsQuery, useToggleSlotStatusMutation } from "../../../../redux/features/slot/slotApi";
import Container from "../../../../components/Shared/Container/Container";
import Loader from "../../../../components/Shared/Loader/Loader";

interface Service{
    name:string
}


interface Slot {
  _id: string;
  service:Service;
  date: string; // "YYYY-MM-DD" format
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
}


const SlotManagement: React.FC = () => {
    const { data: fetchedSlots, error, isLoading } = useGetAllSlotsQuery(undefined);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [toggleSlotStatus] = useToggleSlotStatusMutation();
    useEffect(() => {
        if (fetchedSlots) {
          // Get current date in Bangladesh time (GMT+6)
          const today = new Date();
          today.setUTCHours(0, 0, 0, 0); // Start of today in UTC
    
          // Convert today to GMT+6 time zone
          const todayInBangladesh = new Date(today.getTime() + (6 * 60 * 60 * 1000));
    
          const filteredSlots = fetchedSlots.data.filter((slot: Slot) => {
            // Parse slot date and convert to UTC
            const slotDate = new Date(slot.date);
            slotDate.setUTCHours(0, 0, 0, 0); // Start of the day in UTC
    
            // Convert slotDate to GMT+6 time zone
            const slotDateInBangladesh = new Date(slotDate.getTime() + (6 * 60 * 60 * 1000));
    
            return slotDateInBangladesh >= todayInBangladesh;
          });
    
          setSlots(filteredSlots);
        }
      }, [fetchedSlots])
  
    const toggleModel = () => {
      setIsModelOpen(!isModelOpen);
    };
  
    const handleStatusToggle = async (slotId: string, currentStatus: string) => {
      if (currentStatus === "booked") {
        alert("Cannot update the status of a booked slot.");
        return;
      }
      
      const newStatus = currentStatus === "available" ? "canceled" : "available";
      try {
        await toggleSlotStatus({ slotId, newStatus }).unwrap();
        const updatedSlots = slots.map((slot) =>
          slot._id === slotId ? { ...slot, isBooked: newStatus } : slot
        );
        setSlots(updatedSlots as Slot[]);
      } catch (error) {
        console.error("Failed to update slot status", error);
      }
    };
  
    if (isLoading) {
      return (
        <Container>
          <div className="p-4 flex flex-col items-center justify-center h-screen ">
            <Loader />
          </div>
        </Container>
      );
    }
  
    if (error) {
      return (
        <Container>
          <div className="p-4 py-12">
            <p className="text-center text-red-500">
              An error occurred while fetching service details.
            </p>
          </div>
        </Container>
      );
    }
  
    return (
      <div className=" bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-md md:text-2xl font-semibold text-gray-800">Slot Management</h2>
        <button
          onClick={toggleModel}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 md:px-5 lg:px-5 py-2.5 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
        >
          Add Slot
        </button>
        </div>
  
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                {["Service Name", "Date", "Start Time", "End Time", "Status", "Actions"].map((heading) => (
                  <th key={heading} className="p-4 border-b border-blue-200">
                    <p className="text-sm font-medium flex items-center justify-between gap-2">
                      {heading}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {slots.map((slot, index) => (
                <tr key={slot._id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{slot?.service?.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{slot?.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{slot?.startTime}</p>
                    
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{slot?.endTime}</p>
                  </td>
                  <td className="p-4">
                    <div
                      className={`py-1 px-2 text-xs rounded-full font-bold ${
                        slot.isBooked === "booked"
                          ? "bg-red-100 text-red-600"
                          : slot.isBooked === "canceled"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {slot.isBooked}
                    </div>
                  </td>
                  <td className="p-4">
                    <label className="relative inline-flex items-center cursor-pointer ">
                      <input
                        type="checkbox"
                        checked={slot.isBooked === "available"}
                        onChange={() => handleStatusToggle(slot._id, slot.isBooked)}
                        className="sr-only "
                        aria-label="Toggle slot status "
                      />
                      <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
                      <div
                        className={`absolute w-5 h-5 bg-blue-500 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                          slot.isBooked === "available" ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
       
  
        {isModelOpen && <AddSlotModal toggleModel={toggleModel} />}
      </div>
    );
  };
  
  export default SlotManagement;