import { useState } from "react";
import AddServiceModal from "./AddServiceModal";

const services = [
    {
        name: 'Car Wash',
        description: 'Professional car washing service',
        duration: '60m',
        isDeleted: false,
        price: '50$',
    },
    {
        name: 'Car Repair',
        description: 'Comprehensive car repair service',
        duration: '120m',
        isDeleted: true,
        price: '100$',
    },
    {
        name: 'Car Repair',
        description: 'Comprehensive car repair service',
        duration: '120m',
        isDeleted: true,
        price: '100$',
    },
    // Add more services as needed
];

const ServiceManagement = () => {
    const [isModelOpen, setIsModelOpen]=useState(false)
    const toggleModel=()=>{
        setIsModelOpen(!isModelOpen)
    }
    return (
        <div className="p-6">
            {/* Top bar with Add Task button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-gray-900">Service Management</h2>
                <button onClick={toggleModel} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Add Service
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                    {/* table head */}
                    <thead>
                        <tr>
                            {['Name', 'Description', 'Duration', 'isDeleted', 'Price', 'Actions'].map((heading) => (
                                <th key={heading} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                        {heading}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                        </svg>
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* table body */}
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={index}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{service.name}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{service.description}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{service.duration}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md ${service.isDeleted ? 'bg-red-500/20 text-red-600' : 'bg-green-500/20 text-green-600'}`}>
                                        <span>{service.isDeleted.toString()}</span>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{service.price}</p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex gap-2">
                                        <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                        <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                                    <path fillRule="evenodd" d="M6.75 4.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zM5.25 7.5A.75.75 0 016 6.75h12a.75.75 0 01.75.75v11.25A2.25 2.25 0 0116.5 21H7.5a2.25 2.25 0 01-2.25-2.25V7.5z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-500 py-1">
                                Made with <a href="https://www.creative-tim.com/product/soft-ui-dashboard-tailwind" className="text-gray-900 hover:text-gray-800" target="_blank" rel="noopener noreferrer">Soft UI</a> by <a href="https://www.creative-tim.com" className="text-gray-900 hover:text-gray-800" target="_blank" rel="noopener noreferrer"> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* add service model */}
            {isModelOpen &&  <AddServiceModal toggleModel={toggleModel}/>}
        </div>
    );
};

export default ServiceManagement;
