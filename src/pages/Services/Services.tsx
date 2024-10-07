import React, { useState, useEffect } from "react";
import Container from "../../components/Shared/Container/Container";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import ServiceCard from "./ServiceCard";
import Loader from "../../components/Shared/Loader/Loader";

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  image: string;
}

const Services: React.FC = () => {
  const { data,isError, isLoading } = useGetAllServicesQuery(undefined);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>(""); // State to track active button
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!data) return;

    let updatedServices = data.data as Service[];

    if (searchTerm) {
      updatedServices = updatedServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      updatedServices = updatedServices.filter((service) => {
        if (filterBy === "low-price") return service.price <= 100;
        if (filterBy === "high-price") return service.price > 100;
        if (filterBy === "short-duration") return service.duration <= 60;
        if (filterBy === "long-duration") return service.duration > 60;
        return true;
      });
    }

    setFilteredServices(updatedServices);
  }, [data, searchTerm, filterBy]);

  const handleCancel = () => {
    setSearchTerm("");
    setFilterBy("");
    setActiveButton(""); // Reset active button
    if (data) {
      setFilteredServices(data.data as Service[]);
    }
  };

  const handleFilterClick = (filter: string) => {
    setFilterBy(filter);
    setActiveButton(filter); // Set the clicked button as active
  };

  const buttonClass = (filter: string) =>
    activeButton === filter ? "bg-black text-white" : "bg-white text-gray-400";

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
  return (
    <section className="relative bg-gray-100">
      <Container>
        <div className="p-4 py-12 ">
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center ">
            {/*filter button  */}

            <div className="flex flex-col md:flex-row gap-2 items-center space-y-4 md:space-y-0">
              <button
                className={`py-1.5 px-10 shadow-md rounded-2xl w-full md:w-auto ${buttonClass(
                  ""
                )}`}
                onClick={handleCancel}
              >
                All
              </button>
              <button
                className={`py-1.5 px-6 shadow-md rounded-2xl w-full md:w-auto ${buttonClass(
                  "low-price"
                )}`}
                onClick={() => handleFilterClick("low-price")}
              >
                Low Price
              </button>
              <button
                className={`py-1.5 px-6 shadow-md rounded-2xl w-full md:w-auto ${buttonClass(
                  "high-price"
                )}`}
                onClick={() => handleFilterClick("high-price")}
              >
                High Price
              </button>
              <button
                className={`py-1.5 px-6 shadow-md rounded-2xl w-full md:w-auto ${buttonClass(
                  "short-duration"
                )}`}
                onClick={() => handleFilterClick("short-duration")}
              >
                Short Duration
              </button>
              <button
                className={`py-1.5 px-10 shadow-md rounded-2xl w-full md:w-auto ${buttonClass(
                  "long-duration"
                )}`}
                onClick={() => handleFilterClick("long-duration")}
              >
                Long Duration
              </button>
            </div>
            {/* search */}
            <div className="flex flex-row justify-end rounded-2xl bg-white shadow-md overflow-hidden max-w-md  font-[sans-serif]">
              <input
                type="email"
                placeholder="Search Something..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none bg-white text-sm px-5 py-2"
              />
              <button
                type="button"
                className="flex items-center justify-center px-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="18px"
                >
                  <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
                    fill="#808080"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <section className="p-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Services;
