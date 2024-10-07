import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  SelectedSlot,
  selectSelectedSlots,
  removeSlot,
} from "../../redux/features/booking/bookingSlice";
import useCurrentUser from "../../utils/hooks/useCurrentUser";
import { useBookingMutation } from "../../redux/features/booking/bookingApi";

import { FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Container from "../../components/Shared/Container/Container";
import toast, { Toaster } from "react-hot-toast";

const Payment = () => {


  const [booking, { isLoading }] = useBookingMutation();

  const dispatch = useAppDispatch();
  const { userId, userData } = useCurrentUser();
  const bookingSlotsDataFromState: SelectedSlot[] =
    useAppSelector(selectSelectedSlots);

  const [userName, setUserName] = useState(userData?.name || "");
  const [userEmail, setUserEmail] = useState(userData?.email || "");
  const [selectedService, setSelectedService] = useState<SelectedSlot[]>([]);

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || "");
      setUserEmail(userData.email || "");
    }

    if (bookingSlotsDataFromState.length > 0  ) {

      const filter= bookingSlotsDataFromState.filter((fil)=> fil?.userId === userId)
      setSelectedService(filter);
    }
  }, [userData, bookingSlotsDataFromState]);

  const handleRemoveSlot = (slotId: string, serviceId: string) => {
    dispatch(removeSlot({ slotId, serviceId }));
  };

  const handlePaymentNow = async () => {
    try {
      const BookingData = {
       userId,
       bookingService:selectedService,
      };
console.log(BookingData)
      const response = await booking(BookingData).unwrap();


 

      if (response && response?.data?.payment_url) {
        window.location.href = response?.data?.payment_url;
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error :any) {
      console.error("Error processing payment:", error);
      toast.error(error?.data?.message ||  "Unexpected error occurred");
    }
  };

  const totalItems = selectedService.length;
  const totalPrice = selectedService.reduce(
    (acc, service) => acc + service.price,
    0
  );

  const isConfirmEnabled = totalItems > 0;

  return (
    <div className="bg-gray-100 border">
    <Container>
    <div className="p-4">
        <div className="flex flex-col md:flex-row shadow-lg ">
          <div className="w-full md:w-3/4 bg-white px-4 py-6 md:px-10 md:py-10 ">
            <div className="flex justify-between border-b pb-4 md:pb-8">
              <h1 className="font-semibold text-xl md:text-2xl">Services Cart</h1>
              <h2 className="font-semibold text-black text-xl md:text-2xl">{totalItems > 1 ? `${totalItems} Services` : `${totalItems} Service`}</h2>
            </div>

            <div className="flex mt-6 md:mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">Image</h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">Name</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Start Time</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Duration</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Remove</h3>
            </div>

            <div className="h-72 md:h-96 overflow-y-auto">
              {selectedService.map((service) => (
                <div key={service.slotId} className="flex items-center border hover:bg-gray-100 -mx-4 md:-mx-8 px-4 md:px-6 py-5">
                  <div className="flex w-1/5">
                    <img className="h-8 md:h-14" src={service.image} alt={service.serviceName} />
                  </div>
                  <div className="flex w-1/5">
                    <span className="font-bold text-sm">{service?.serviceName}</span>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span>{service.startTime}</span>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span>{service.duration}</span>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${service.price}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    <button
                      onClick={() => handleRemoveSlot(service.slotId, service.serviceId)}
                      aria-label={`Remove ${service.serviceName}`}
                    >
                      <FaTrashAlt />
                    </button>
                  </span>
                </div>
              ))}
            </div>

            <NavLink to={'/services'} className="flex font-semibold text-indigo-600 text-sm mt-6 md:mt-10">
              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373-9.373-9.373-24.569 0-33.941l86.059-86.059c15.119-15.119 40.971-4.411 40.971 16.971V296z" />
              </svg>
              Continue Booking
            </NavLink>
          </div>

          <div id="summary" className="w-full md:w-1/4 px-4 py-6 md:px-8 md:py-10 bg-[#f6f6f6]">
            <h1 className="font-semibold text-xl md:text-2xl border-b pb-4 md:pb-8">Payment Info</h1>
            <div className="flex justify-between mt-6 md:mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">{totalItems > 1 ? `Services ${totalItems}`  :`Service ${totalItems}`}</span>
              <span className="font-semibold text-sm">${totalPrice.toFixed(2)}</span>
            </div>
           
            <div className="py-2 flex flex-col">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">User Name</label>
              <input
                type="text"
                defaultValue={userName}
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <div className="py-2 flex flex-col">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">User Email</label>
              <input
                type="text"
                defaultValue={userEmail}
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <div className="py-8">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-black hover:bg-zinc-950 px-5 py-2 text-sm text-white uppercase">Apply</button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
  onClick={handlePaymentNow}
  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
  disabled={!isConfirmEnabled}
>
  {isLoading ? "Processing" : "Booking Now"}
</button>

            </div>
          </div>
        </div>
      </div>
    </Container>
    <Toaster />
    </div>
  );
};

export default Payment;
