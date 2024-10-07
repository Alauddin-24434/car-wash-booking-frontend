import { useParams } from "react-router-dom";
import { FindSlot } from "./FindSlot";
import { useGetServiceByIdQuery } from "../../redux/features/service/serviceApi";
import Container from "../../components/Shared/Container/Container";
import useCurrentUser from "../../utils/hooks/useCurrentUser";



const BookingSlot = () => {
    const { id } = useParams();
const {userId}=useCurrentUser()
    const { data, isError, isLoading } = useGetServiceByIdQuery(id);
    

  if (isLoading) {
    return (
      <Container>
        <div className="p-4 py-12">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </Container>
    );
  }

  if (isError) {
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

  if (!data) {
    return (
      <Container>
        <div className="p-4 py-12">
          <p className="text-center text-gray-500">
            No service details available.
          </p>
        </div>
      </Container>
    );
  }
    return (
        <Container>
              <div className="py-12">
          <FindSlot userId={userId as string} serviceId={id as string} serviceName={data?.data?.name} duration={data?.data?.duration} image={data?.data?.image} price={data?.data?.price} />
        </div>
        </Container>
    );
};

export default BookingSlot;