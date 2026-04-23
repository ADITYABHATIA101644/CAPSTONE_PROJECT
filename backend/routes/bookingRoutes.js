const express = require('express');
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect, userOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, userOnly, createBooking);
router.get('/my', protect, userOnly, getMyBookings);
router.delete('/:id', protect, userOnly, cancelBooking);

module.exports = router;