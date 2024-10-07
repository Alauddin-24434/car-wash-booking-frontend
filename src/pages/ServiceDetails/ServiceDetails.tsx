import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Shared/Container/Container";
import { useGetServiceByIdQuery } from "../../redux/features/service/serviceApi";
import { useState } from "react";
import Loader from "../../components/Shared/Loader/Loader";
import useCurrentUser from "../../utils/hooks/useCurrentUser";
import { useCreateReviewMutation } from "../../redux/features/review/reviewApi";

const ServiceDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetServiceByIdQuery(id);
  const [createReview]=useCreateReviewMutation()
  const navigate = useNavigate();
  const {userId}=useCurrentUser()
  // State for toggling review section
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleBookingSlot = () => {
    navigate(`/bookingSlot/${id}`);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({userId, serviceId: id, rating, feedback });
   await createReview({userId, serviceId: id, rating, feedback}).unwrap()
    setRating(0);
    setFeedback("");
    setActiveTab("description");
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
      <div className="p-4 py-12">
        <div className="font-sans">
          <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
              <div className="w-full lg:sticky top-0 text-center">
                <div className="lg:h-[560px]">
                  <img
                    src={data.data.image}
                    alt="Product"
                    className="lg:w-11/12 w-full h-full rounded-md object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-start gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {data?.data?.name}
                  </h2>
                  <button
                    type="button"
                    className="ml-auto px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <svg
                      width="12px"
                      fill="currentColor"
                      className="mr-1"
                      viewBox="0 0 64 64"
                    >
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    </svg>
                    100
                  </button>
                </div>

                <hr className="my-8" />

                <div className="flex flex-wrap gap-4 items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Price</h3>
                    <p className="font-semibold text-sm mt-4">
                      ${data?.data?.price}
                    </p>
                  </div>

                  <button className="ml-auto px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center">
                    <svg
                      className="w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 14 13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    4.8
                  </button>
                </div>

                <hr className="my-8" />

                <div>
                  <h3 className="text-xl font-bold text-gray-800">Duration</h3>
                  <p className="font-semibold text-sm mt-4">
                    {data?.data?.duration === 60
                      ? "1 Hour"
                      : `${data?.data?.duration} Minutes`}
                  </p>
                </div>

                <hr className="my-[90px]" />

                <button
                  onClick={handleBookingSlot}
                  type="button"
                  className="min-w-[250px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="mt-20 max-w-4xl">
              <ul className="flex border-b">
                <li
                  className={`text-sm font-semibold py-3 px-8 cursor-pointer ${
                    activeTab === "description"
                      ? "text-gray-800 bg-gray-100 border-b-2 border-gray-800"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </li>
                <li
                  className={`text-sm font-semibold py-3 px-8 cursor-pointer ${
                    activeTab === "reviews"
                      ? "text-gray-800 bg-gray-100 border-b-2 border-gray-800"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </li>
              </ul>

              {activeTab === "description" && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">
                    Service Description
                  </h3>
                  <p className="text-sm text-gray-500 mt-4">
                    {data?.data?.description}
                  </p>
                  {/* Add full description here */}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">
                    Leave a Review
                  </h3>
                  <form
                    onSubmit={handleReviewSubmit}
                    className="mt-4 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`w-6 h-6 ${
                            rating > index ? "text-yellow-400" : "text-gray-400"
                          }`}
                          onClick={() => handleStarClick(index + 1)}
                        >
                          ★
                        </button>
                      ))}
                    </div>

                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                      placeholder="Write your feedback here..."
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-md hover:bg-gray-900"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetails;
