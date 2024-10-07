import React from "react";
import { useGetAllReviewsQuery } from "../../redux/features/review/reviewApi";
import Loader from "../../components/Shared/Loader/Loader";
import Container from "../../components/Shared/Container/Container";


// types.ts
export interface ReviewUser {
  _id: string;
  name: string;
  image: string;
}

export interface Review {
  _id: string;
  userId: ReviewUser;
  feedback: string;
  reviewText: string;
  rating: number;
}

export interface GetReviewsResponse {
  data: Review[];
}

const Reviews: React.FC = () => {
  const { data, error, isLoading } = useGetAllReviewsQuery(undefined);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12">Error loading reviews.</div>;
  }

  const reviews = (data as GetReviewsResponse).data;

 

  return (
    <div className="bg-[#0E111B] py-12 ">
      <Container>
      <div className="p-4">
      
        <div className="py-12 grid gap-6 text-center md:grid-cols-3 lg:gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="mb-12 md:mb-0 bg-white p-4">
              <div className="mb-6 flex justify-center">
                <img
                  src={review?.userId?.image}
                  alt={`${review?.userId?.name}'s avatar`}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/30"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">{review?.userId?.name}</h5>
              <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
              Our Customer
              </h6>
              <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                <span className="inline-block pe-2 [&>svg]:w-5">
                  {/* Replace this SVG with appropriate content if needed */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                  </svg>
                </span>
                {review.feedback}
              </p>
              <ul className="mb-0 flex items-center justify-center">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <li key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      </Container>
    </div>
  );
};

export default Reviews;
