
import Container from '../Shared/Container/Container';

// Sample review data
const reviews = [
  {
    name: "Maria Smantha",
    title: "Our Customer",
    imageUrl: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    rating: 5
  },
  {
    name: "Lisa Cudrow",
    title: "Our Customer",
    imageUrl: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg",
    reviewText: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    rating: 4
  },
  {
    name: "Maria Smantha",
    title: "Our Customer",
    imageUrl: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    rating: 5
  },
  // Add more reviews as needed
];

const ReviewSection = () => {
  return (
    <div className="bg-[#0E111B] py-12">
      <Container>
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-sm md:text-base text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
          Testimonials
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#fff] font-bold leading-[1.1em] tracking-[-0.2px] mt-2"> 
            What people think about<br className="hidden md:block" /> our services
          </h2>
          
        </div>
        <div className="py-12 grid gap-6 text-center md:grid-cols-3 lg:gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="mb-12 md:mb-0 bg-white p-4">
              <div className="mb-6 flex justify-center">
                <img
                  src={review.imageUrl}
                  alt={`${review.name}'s avatar`}
                  className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">{review.name}</h5>
              <h6 className="mb-4 font-semibold text-primary dark:text-primary-400">
                {review.title}
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
                {review.reviewText}
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

export default ReviewSection;
