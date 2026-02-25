const express = require('express');
const router = express.Router();
const rateLimit = require('../middleware/rateLimit.middleware');

const EventController = require('../controllers/event.controllers');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, rateLimit, EventController.createEvent);

router.post('/:id/register', authMiddleware, rateLimit, EventController.registerForEvent);

router.get('/', authMiddleware, rateLimit, EventController.getAllEvents);

module.exports = router;