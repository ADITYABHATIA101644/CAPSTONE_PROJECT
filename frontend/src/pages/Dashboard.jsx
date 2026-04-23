import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    totalSeats: 50,
    price: 0,
  });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.role === 'admin';
  const isUser = userInfo?.role === 'user';

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (!user) {
      navigate('/');
      return;
    }

    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get('/events');
      setEvents(data);
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to fetch events');
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();

    try {
      await API.post('/events', form);
      alert('Event added successfully');
      setForm({
        title: '',
        description: '',
        date: '',
        time: '',
        totalSeats: 50,
        price: 0,
      });
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to add event');
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      alert('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Delete failed');
    }
  };

  const bookEvent = async (event) => {
    const confirmPayment = window.confirm(
      `Event: ${event.title}\nPrice: ₹${event.price}\n\nProceed to payment?`
    );

    if (!confirmPayment) return;

    alert('Payment Successful ✅');

    try {
      await API.post('/bookings', { eventId: event._id });
      alert('Booking confirmed 🎉');
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Booking failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const getEventDateTime = (event) => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toISOString().split('T')[0];
    return new Date(`${formattedDate}T${event.time || '00:00'}`);
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();

    let result = [...events];

    if (selectedDate) {
      result = result.filter((event) => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === selectedDate;
      });
    }

    if (activeTab === 'upcoming') {
      result = result.filter((event) => getEventDateTime(event) >= now);
    } else if (activeTab === 'past') {
      result = result.filter((event) => getEventDateTime(event) < now);
    }

    result.sort((a, b) => getEventDateTime(a) - getEventDateTime(b));

    return result;
  }, [events, selectedDate, activeTab]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-topbar">
        <div>
          <p className="section-tag">{isAdmin ? 'Admin Panel' : 'User Panel'}</p>
          <h1>Events Dashboard</h1>
          <p className="section-subtitle">
            {isAdmin
              ? 'Manage events, seats, pricing and schedule from one modern dashboard.'
              : 'Explore events, make payment and reserve your seat easily.'}
          </p>
        </div>

        <div className="top-actions">
          {isUser && (
            <button className="secondary-btn" onClick={() => navigate('/my-bookings')}>
              My Bookings
            </button>
          )}
          <button className="danger-outline-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className={`dashboard-layout ${isAdmin ? '' : 'user-layout'}`}>
        {isAdmin && (
          <form className="event-form glass-card" onSubmit={addEvent}>
            <h2>Add New Event</h2>

            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Hackathon, workshop, seminar..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter event details"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Total Seats</label>
              <input
                type="number"
                min="1"
                value={form.totalSeats}
                onChange={(e) => setForm({ ...form, totalSeats: Number(e.target.value) })}
                required
              />
            </div>

            <div className="input-group">
              <label>Price (₹)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </div>

            <button type="submit" className="primary-btn">Add Event</button>
          </form>
        )}

        <div className="events-section">
          <div className="events-header">
            <h2>{isAdmin ? 'Manage Events' : 'Available Events'}</h2>
            <span>{filteredEvents.length} showing</span>
          </div>

          <div className="filter-bar glass-card">
            <div className="tab-buttons">
              <button
                className={activeTab === 'upcoming' ? 'tab-btn active-tab' : 'tab-btn'}
                onClick={() => setActiveTab('upcoming')}
                type="button"
              >
                Upcoming Events
              </button>

              <button
                className={activeTab === 'past' ? 'tab-btn active-tab' : 'tab-btn'}
                onClick={() => setActiveTab('past')}
                type="button"
              >
                Past Events
              </button>
            </div>

            <div className="date-filter-box">
              <label>Filter by Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <button
                  type="button"
                  className="clear-filter-btn"
                  onClick={() => setSelectedDate('')}
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          <div className="events-grid">
            {filteredEvents.length === 0 ? (
              <div className="empty-state glass-card">
                <h3>No events found</h3>
                <p>
                  {selectedDate
                    ? `No ${activeTab} events found for the selected date.`
                    : `No ${activeTab} events available right now.`}
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isFull = event.bookedSeats >= event.totalSeats;

                return (
                  <div key={event._id} className="event-card glass-card">
                    <span className="event-chip">{isAdmin ? 'Admin View' : 'Live Event'}</span>

                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>

                    <div className="event-meta">
                      <div>
                        <span>Date</span>
                        <strong>{new Date(event.date).toLocaleDateString()}</strong>
                      </div>
                      <div>
                        <span>Time</span>
                        <strong>{event.time}</strong>
                      </div>
                      <div>
                        <span>Seats</span>
                        <strong>{event.bookedSeats}/{event.totalSeats}</strong>
                      </div>
                      <div>
                        <span>Price</span>
                        <strong>₹{event.price}</strong>
                      </div>
                    </div>

                    <div className="card-actions">
                      {isUser && activeTab === 'upcoming' && (
                        <button
                          className="success-btn"
                          onClick={() => bookEvent(event)}
                          disabled={isFull}
                        >
                          {isFull ? 'Sold Out' : `Pay ₹${event.price} & Book`}
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          className="danger-btn full-width-btn"
                          onClick={() => deleteEvent(event._id)}
                        >
                          Delete Event
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;