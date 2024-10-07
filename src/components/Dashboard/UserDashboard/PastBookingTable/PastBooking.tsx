import React from 'react';

interface BookingService {
  _id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Booking {
  _id: string;
  bookingService: BookingService[];
}

interface PastBookingProps {
  bookingData: Booking[];
}

const PastBooking: React.FC<PastBookingProps> = ({ bookingData }) => {
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Past Booking</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              {["Service Name", "Date", "Start Time", "End Time"].map((heading) => (
                <th key={heading} className="p-4 border-b border-blue-200">
                  <p className="text-sm font-medium">{heading}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookingData?.flatMap((booking) => 
              booking.bookingService.map((service) => (
                <tr
                  key={service._id}
                  className={`border-b ${
                    booking.bookingService.indexOf(service) % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{service.serviceName}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{service.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{service.startTime}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-700">{service.endTime}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBooking;
