import React, { useState, useEffect } from 'react';
import Container from "../../components/Shared/Container/Container";
import ServiceCard from './ServiceCard';
import { useGetAllServicesQuery } from '../../redux/features/service/serviceApi';

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  image: string;
}

const Services: React.FC = () => {
  // Fetch real data
  const { data, error, isLoading } = useGetAllServicesQuery(undefined);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!data) return; // No data yet, return early

    let updatedServices = data.data as Service[];

    if (searchTerm) {
      updatedServices = updatedServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      updatedServices = updatedServices.filter(service => {
        if (filterBy === 'low-price') return service.price <= 100;
        if (filterBy === 'high-price') return service.price > 100;
        if (filterBy === 'short-duration') return service.duration <= 60;
        if (filterBy === 'long-duration') return service.duration > 60;
        return true;
      });
    }

    if (sortBy === 'price-asc') {
      updatedServices = updatedServices.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      updatedServices = updatedServices.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration-asc') {
      updatedServices = updatedServices.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-desc') {
      updatedServices = updatedServices.sort((a, b) => b.duration - a.duration);
    }

    setFilteredServices(updatedServices);
  }, [data, searchTerm, filterBy, sortBy]);

  const handleCancel = () => {
    setSearchTerm('');
    setFilterBy('');
    setSortBy('');
    if (data) {
      setFilteredServices(data.data as Service[]);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading services</p>;

  return (
    <section className="relative bg-[#F0F3FF]">
      <Container>
        <div className='p-4 py-12'>
          <h2 className="text-sm md:text-base text-[#0068d8] font-bold leading-[1.1em] tracking-[-0.2px]">
            Our Services
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#0e111b] font-bold leading-[1.1em] tracking-[-0.2px] mt-2">
            We are dedicated to providing <br className="hidden md:block" /> our best service to you
          </h2>
          <span className="flex flex-col gap-2 pt-4 md:flex-row md:justify-between ">
            <p className="text-xs md:text-xs lg:text-sm mt-4 text-[#424649]">
              At our company, we provide a range of high-quality services designed to meet <br className="hidden md:block" /> your needs and exceed your expectations.
            </p>
            <div className="flex flex-col md:flex-row gap-2 justify-end items-center space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Search services..."
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="">Filter by</option>
                <option value="low-price">Low Price</option>
                <option value="high-price">High Price</option>
                <option value="short-duration">Short Duration</option>
                <option value="long-duration">Long Duration</option>
              </select>
              <select
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Short to Long</option>
                <option value="duration-desc">Duration: Long to Short</option>
              </select>
              <button 
                className="p-2 border border-gray-300 rounded bg-red-500 text-white w-full md:w-auto" 
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </span>
        </div>
        <section className="p-4">
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
