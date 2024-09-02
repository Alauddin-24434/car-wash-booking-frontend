import React from "react";
import ServiceCard from "../../pages/Services/ServiceCard";
import Container from "../Shared/Container/Container";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";

// Define the type for the service data
interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  isDeleted: boolean;
}

const WhatWeAreOffering: React.FC = () => {
  const { data, error, isLoading } = useGetAllServicesQuery(undefined);

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-[#F0F3FF] border py-12">
        <Container>
          <div className="flex justify-center items-center h-64">
            <p className="text-[#0068d8] font-bold text-xl">
              Loading services...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-[#F0F3FF] border py-12">
        <Container>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 font-bold text-xl">
              Error loading services. Please try again later.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Limit to six services
  const servicesToShow = data?.data.slice(0, 6) || [];

  return (
    <div className="bg-[#F0F3FF] border py-12">
      <Container>
        <div className="flex flex-col  text-center p-4">
            <h2 className="text-sm md:text-base  text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
              What We Offer
            </h2>
            <h2 className="text-2xl md:text-[52px] text-[#0e111b] font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
              We are dedicated to providing <br className="hidden md:block" />{" "}
              our best service to you
            </h2>

          </div>
      
        <section className="p-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {servicesToShow.map((service: Service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default WhatWeAreOffering;
