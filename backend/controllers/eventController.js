const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, totalSeats, price } = req.body;

    if (!title || !description || !date || !time) {
      return res.status(400).json({ message: 'Title, description, date and time are required' });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      totalSeats: totalSeats || 50,
      price: price || 0,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};