import Container from "../../components/Shared/Container/Container";
import { FindSlot } from "./FindSlot";
import imagee from '/images/banner1.jpg'
const ServiceDetails = () => {
  // Example service details
  const service = {
    name: "Car Wash Service",
    description:
      "A thorough car wash to keep your vehicle sparkling clean. Includes exterior wash, interior vacuum, and window cleaning.",
    duration: "1 hour",
    price: "25.00",
    imagee,
    // imageUrl:
    //   "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  };

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
              src={service.imagee}
              alt={service.name}
            />
            <div className="absolute inset-0 w-full h-full bg-[#0068d8] opacity-35"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white text-2xl font-bold">
           {service.name}
            </div>
          </div>
          <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <p className="text-gray-600">{service.description}</p>
              <p
                className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
              
              >
                <span>${service.duration}</span>
               
              </p>
              <p
                className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
              
              >
                <span>${service.price}</span>
               
              </p>
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
     
      <FindSlot />
      </div>
    </Container>
  );
};

export default ServiceDetails;
