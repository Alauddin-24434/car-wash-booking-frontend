import React, { useEffect, useState } from 'react';

interface BookingService {
  _id: string;
  serviceName: string;
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:MM'
  endTime: string;
}

interface Booking {
  _id: string;
  bookingService: BookingService[];
}

interface UpcomingBookingsProps {
  bookingData: Booking[];
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookingData }) => {
  const [nextBookingCountdown, setNextBookingCountdown] = useState<string>('');
  const [nextBookingDate, setNextBookingDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!bookingData || !Array.isArray(bookingData)) {
      return;
    }

    // Convert date and startTime into a Date object
    const upcomingServices = bookingData
      .flatMap(booking => booking.bookingService)
      .map(service => {
        const [year, month, day] = service.date.split('-').map(Number);
        const [hours, minutes] = service.startTime.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
      })
      .filter(date => date > new Date());

    if (upcomingServices.length > 0) {
      const nextDate = new Date(Math.min(...upcomingServices.map(date => date.getTime())));
      setNextBookingDate(nextDate);
      updateCountdown(nextDate);
    }
  }, [bookingData]);

  const updateCountdown = (date: Date) => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeLeft = date.getTime() - now.getTime();

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setNextBookingCountdown('Time is up!');
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setNextBookingCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  };

  // Helper function to format the date
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingData?.flatMap((booking) =>
            booking.bookingService.map((service) => {
              const [year, month, day] = service.date.split('-').map(Number);
              const [hours, minutes] = service.startTime.split(':').map(Number);
              const serviceDate = new Date(year, month - 1, day, hours, minutes);

              return (
                <div
                  key={service._id}
                  className="booking-card bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
                >
                  <div className="flex flex-col items-start w-full">
                    <div className="text-lg font-semibold text-gray-900 mb-3">
                      {service.serviceName}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Date:</strong> {formatDate(serviceDate)} {service.startTime}
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>Countdown:</strong> {serviceDate.getTime() === nextBookingDate?.getTime() ? nextBookingCountdown : 'N/A'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingBookings;
