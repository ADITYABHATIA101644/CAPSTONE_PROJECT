const express = require('express');
const {
  getEvents,
  createEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getEvents);
router.post('/', protect, adminOnly, createEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

module.exports = router;