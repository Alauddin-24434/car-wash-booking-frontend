import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { fetchUserBookings } from '../features/bookingSlice';
import './UserDashboard.css';

interface Booking {
  id: string;
  service: string;
  date: string;
  status: 'UPCOMING' | 'PAST';
}

const fakeBookings: Booking[] = [
  { id: '1', service: 'Service A', date: '2024-09-05T10:30:00', status: 'UPCOMING' },
  { id: '2', service: 'Service B', date: '2024-08-30T14:00:00', status: 'PAST' },
  { id: '3', service: 'Service C', date: '2024-09-10T09:00:00', status: 'UPCOMING' },
  { id: '4', service: 'Service D', date: '2024-08-15T11:00:00', status: 'PAST' },
];

const UserDashboard: React.FC = () => {
  const user = { id: 'user123', name: 'John Doe', email: 'john.doe@example.com' };
  const [bookings, setBookings] = useState<Booking[]>(fakeBookings);
  const [nextBookingCountdown, setNextBookingCountdown] = useState<string>('');

  useEffect(() => {
    const upcomingBookings = bookings.filter(booking => booking.status === 'UPCOMING');
    if (upcomingBookings.length > 0) {
      const nextBookingDate = new Date(upcomingBookings[0].date);
      updateCountdown(nextBookingDate);
    }
  }, [bookings]);

  const updateCountdown = (date: Date) => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeLeft = date.getTime() - now.getTime();
      
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setNextBookingCountdown('Time is up!');
        return;
      }

      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setNextBookingCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}!</h2>

      <section className="account-info">
        <h3>Account Information</h3>
        <p>Email: {user.email}</p>
        <button className="btn-primary" onClick={() => {/* Handle profile update */}}>Update Profile</button>
      </section>

      <section className="bookings-overview">
        <h3>Bookings Overview</h3>
        
        <div className="upcoming-bookings">
          <h4>Upcoming Bookings</h4>
          <div className="booking-cards">
            {bookings.filter(booking => booking.status === 'UPCOMING').map(booking => (
              <div key={booking.id} className="booking-card">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
                <p><strong>Countdown:</strong> {nextBookingCountdown}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="past-bookings">
          <h4>Past Bookings</h4>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(booking => booking.status === 'PAST').map(booking => (
                <tr key={booking.id}>
                  <td>{booking.service}</td>
                  <td>{new Date(booking.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
