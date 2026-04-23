import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
      navigate('/');
      return;
    }

    if (user.role !== 'user') {
      alert('Only users can access bookings');
      navigate('/dashboard');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/my');
      setBookings(data);
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to fetch bookings');
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      alert('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Cancel failed');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-topbar">
        <div>
          <p className="section-tag">Your Reservations</p>
          <h1>My Bookings</h1>
          <p className="section-subtitle">
            View your reserved events and cancel them if needed.
          </p>
        </div>

        <div className="top-actions">
          <button className="secondary-btn" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="events-grid">
        {bookings.length === 0 ? (
          <div className="empty-state glass-card">
            <h3>No bookings found</h3>
            <p>You have not booked any event yet.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div className="event-card glass-card" key={booking._id}>
              <span className="event-chip">Reserved</span>
              <h3>{booking.event?.title}</h3>
              <p className="event-description">{booking.event?.description}</p>

              <div className="event-meta">
                <div>
                  <span>Date</span>
                  <strong>
                    {booking.event ? new Date(booking.event.date).toLocaleDateString() : 'N/A'}
                  </strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>{booking.event?.time || 'N/A'}</strong>
                </div>
                <div>
                  <span>Price</span>
                  <strong>₹{booking.event?.price || 0}</strong>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="danger-btn full-width-btn"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;