import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "../Shared/Container/Container";

const WhatWeAreOffering = () => {
  return (
    <div className="bg-[#F0F3FF] border py-12">
      <Container>
        <div className="flex flex-col p-4">
          <div>
            <h2 className="text-sm md:text-base text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
              What We Offer
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#0e111b] font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
              We are dedicated to providing <br className="hidden md:block" />{" "}
              our best service to you
            </h2>

            <span className="flex  justify-between">
              <p className="text-xs md:text-xs lg:text-sm mt-4 text-[#424649]">
                At our company, we provide a range of high-quality services
                designed to meet <br className="hidden md:block" /> your needs
                and exceed your expectations.
              </p>
              <button className="bg-[#0068d8] hover:bg-[#1a77dc] py-1 px-5 md:py-1 md:px-7 text-white text-sm md:text-base hover:text-xs uppercase hover:w-44 hover:h-12 ">
                View All Services
              </button>
             
            </span>
          </div>
        </div>
        <ServiceCard />
      </Container>
    </div>
  );
};

export default WhatWeAreOffering;
