import UpcomingBookings from "../../../../components/Dashboard/UserDashboard/UpcomingBookings/UpcomingBookings";
import Container from "../../../../components/Shared/Container/Container";
import Loader from "../../../../components/Shared/Loader/Loader";
import { useGetCurrentUserBookingByUserIdQuery } from "../../../../redux/features/booking/bookingApi";
import useCurrentUser from "../../../../utils/hooks/useCurrentUser";

const ServiceSlotCountdown = () => {
    
 const { userId} = useCurrentUser() 

 const { data, error, isLoading}=useGetCurrentUserBookingByUserIdQuery(userId)
console.log(error)

 const bookings = data?.data;
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
        <div>
            <UpcomingBookings bookingData={bookings} />
        </div>
    );
};

export default ServiceSlotCountdown;