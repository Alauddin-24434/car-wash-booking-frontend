import { useDeleteServiceByIdMutation, useGetAllServicesQuery } from "@/redux/features/service/serviceApi";
import { useState } from "react";

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import AddServiceModal from "../modal/add-service-modal";
import UpdateServiceModal from "../modal/update.service-modal";

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  images: string[];
}

const ServiceManagement = () => {
  const { data: services, error, isLoading } = useGetAllServicesQuery(undefined);
  const [isAddServiceModelOpen, setIsAddSErviceModelOpen] = useState(false);
  const [isUpdateServiceModalOpen, setisUpdateServiceModalOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [deleteService] = useDeleteServiceByIdMutation();

  const addToggleModel = () => {
    setIsAddSErviceModelOpen(!isAddServiceModelOpen);
  };

  const updateToggleModel = (id: string | null = null) => {
    setisUpdateServiceModalOpen(!isUpdateServiceModalOpen);
    setCurrentServiceId(id);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteService(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md md:text-2xl font-semibold text-gray-800">Service Management</h2>
        <button
          onClick={addToggleModel}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 md:px-5 lg:px-5 py-2.5 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
        >
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              {["Image", "Name", "Duration", "Price", "Actions"].map((heading) => (
                <th key={heading} className="p-4 border-b border-blue-200">
                  <p className="text-sm font-medium flex items-center justify-between gap-2">
                    {heading}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {services?.data?.map((service: Service, index: number) => (
              <tr key={service._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-4">
                  <img src={service.images[0]} alt={service.name} className="h-16 w-16 object-cover rounded-lg" />
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{service.name}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{service.duration}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-700">{service.price}</p>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => updateToggleModel(service._id)} className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                        <path fillRule="evenodd" d="M6.75 4.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zM5.25 7.5A.75.75 0 016 6.75h12a.75.75 0 01.75.75v11.25A2.25 2.25 0 0116.5 21H7.5a2.25 2.25 0 01-2.25-2.25V7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{isAddServiceModelOpen && <AddServiceModal addToggleModel={addToggleModel} />}
{isUpdateServiceModalOpen && (
  <UpdateServiceModal
    updateToggleModel={updateToggleModel}
    serviceId={currentServiceId}
  />
)}

    </div>
  );
};

export default ServiceManagement;
