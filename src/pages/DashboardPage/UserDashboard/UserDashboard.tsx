import PastBooking from "../../../components/Dashboard/UserDashboard/PastBookingTable/PastBooking";
import { useGetCurrentUserBookingByUserIdQuery } from "../../../redux/features/booking/bookingApi";
import useCurrentUser from "../../../utils/hooks/useCurrentUser";

import ProfileCard from "../../../components/Dashboard/Shared/ProfileCard/ProfileCard";
import Container from "../../../components/Shared/Container/Container";
import Loader from "../../../components/Shared/Loader/Loader";
import UpcomingBookings from "../../../components/Dashboard/UserDashboard/UpcomingBookings/UpcomingBookings";

const UserDashboard: React.FC = () => {
  const { userId } = useCurrentUser();

  const { data, error, isLoading } =
    useGetCurrentUserBookingByUserIdQuery(userId);

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



  return (
    <div className="container mx-auto p-6">
    <div className="md:flex no-wrap md:-mx-2 shadow-md border">
      {/* <!-- Left Side --> */}
      <div className="w-full md:w-3/12 md:mx-2">

      <ProfileCard />
      </div>
    
     
     
      {/* <!-- Right Side --> */}
      <div className="w-full md:w-9/12 md:mx-2">
        <div className="bg-white p-3">
          <UpcomingBookings bookingData={bookings} />
        </div>
      </div>
      </div>

      <PastBooking bookingData={bookings} />
    </div>
  );
};

export default UserDashboard;
