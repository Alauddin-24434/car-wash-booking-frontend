

import { useGetAllServicesQuery,  } from "../../../../redux/features/service/serviceApi";
import Container from "../../../Shared/Container/Container";
import Loader from "../../../Shared/Loader/Loader";

// Service interface with an added image field
interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;  // Added image field
}

const TableOne = () => {
  const { data: services,error,isLoading } = useGetAllServicesQuery(undefined);


  if (isLoading) {
    return (
      <Container>
        <div className="p-4 flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      </Container>
    );
  }

  if (error) {
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
    <div className=" my-6 min-h-screen">
      {/* Top bar with Add Service button */}
    
        <h2 className="text-2xl flex flex-row justify-start font-semibold text-gray-800">Top Service</h2>
      

      {/* Table with service data */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          {/* Table head */}
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              {['Image', 'Name', 'Duration', 'Price',].map((heading) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white">
            {services?.data?.map((service: Service, index: number) => (
              <tr key={service._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-4">
                  <img src={service.image} alt={service.name} className="h-16 w-16 object-cover rounded-lg" />
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
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
   

    
  );
};

export default TableOne;
