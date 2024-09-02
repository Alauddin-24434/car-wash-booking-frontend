import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container/Container";
import { FindSlot } from "./FindSlot";
import { FaRegClock } from "react-icons/fa";
import { useGetServiceByIdQuery } from "../../redux/features/service/serviceApi";

const ServiceDetails = () => {
  // Destructure id from useParams
  const { id } = useParams();

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
          <p className="text-center text-red-500">An error occurred while fetching service details.</p>
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <div className="p-4 py-12">
          <p className="text-center text-gray-500">No service details available.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="p-4 py-12">
        <div
          className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
          style={{ minHeight: "19rem" }}
        >
          <div
            className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ minHeight: "19rem" }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={data.data.image}
              alt={data.data.name}
            />
            <div className="absolute inset-0 w-full h-full bg-[#0068d8] opacity-35"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white text-2xl font-bold">
              {/* Additional content can be added here */}
            </div>
          </div>
          <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <p className="text-[#0068d8] text-2xl py-2">{data.data.name}</p>
              <p className="text-gray-600">{data.data.description}</p>
              <div className="flex gap-4 items-center">
                <p className="flex items-baseline mt-3">
                  <span className="flex items-center">
                    <FaRegClock className="text-md" />
                    {data.data.duration}m
                  </span>
                </p>
                <p className="flex items-baseline mt-3">
                  <span>${data.data.price}</span>
                </p>
              </div>
            </div>
            <svg
              className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="py-12">
        <FindSlot serviceId={id as string} serviceName={data.data.name} />
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetails;
