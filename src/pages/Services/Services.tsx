import React, { useState, useEffect } from 'react';
import Container from "../../components/Shared/Container/Container";
import ServiceCard from './ServiceCard';

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  image: string;
}

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const services: Service[] = [
    { id: 1, name: "Car Wash", price: 90, duration: 60, description: "Professional car washing service.", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    { id: 2, name: "Interior Cleaning", price: 120, duration: 90, description: "Thorough interior cleaning for your car.", image: "https://images.unsplash.com/photo-1580657016215-6d42a0ab706d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    { id: 3, name: "Tire Detailing", price: 50, duration: 30, description: "Professional tire detailing and cleaning.", image: "https://images.unsplash.com/photo-1551836022-cb9e021a2597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    { id: 4, name: "Engine Cleaning", price: 150, duration: 120, description: "Comprehensive engine cleaning service.", image: "https://images.unsplash.com/photo-1536520587285-80d4410f1230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    { id: 5, name: "Full Body Wax", price: 200, duration: 180, description: "High-quality full-body waxing service.", image: "https://images.unsplash.com/photo-1581712541081-1f2cbf5a32b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    { id: 6, name: "Paint Protection", price: 250, duration: 240, description: "Advanced paint protection for your car.", image: "https://images.unsplash.com/photo-1580745766843-9e75c1a6949a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  ];

  useEffect(() => {
    let updatedServices = services;

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
  }, [searchTerm, filterBy, sortBy]);

  const handleCancel = () => {
    setSearchTerm('');
    setFilterBy('');
    setSortBy('');
    setFilteredServices(services);
  };

  return (
    <section className="relative bg-[#F0F3FF]">
      <Container>
        <div className='p-4'>
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
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Services;
