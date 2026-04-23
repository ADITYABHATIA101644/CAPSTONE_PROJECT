const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.bookedSeats >= event.totalSeats) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: 'You already booked this event' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
    });

    event.bookedSeats += 1;
    await event.save();

    res.status(201).json({
      message: 'Booking successful',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const event = await Event.findById(booking.event);
    if (event && event.bookedSeats > 0) {
      event.bookedSeats -= 1;
      await event.save();
    }

    await booking.deleteOne();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};