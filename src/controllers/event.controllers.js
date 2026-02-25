const Event = require("../models/Event");
const redisClient = require("../config/redis");

/* ===============================
   CREATE EVENT
================================= */
exports.createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, capacity } = req.body;

    const event = await Event.create({
      title,
      description,
      eventDate,
      capacity,
      organizer: req.user._id,
      participants: []
    });

    // 🔥 Invalidate cache after creating event
    await redisClient.del("all_events");

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   GET ALL EVENTS (WITH REDIS CACHE)
================================= */
exports.getAllEvents = async (req, res) => {
  try {
    const cachedData = await redisClient.get("all_events");

    // ✅ If data exists in Redis
    if (cachedData) {
      console.log("Serving from Redis cache");
      return res.json(JSON.parse(cachedData));
    } 
    console.log("Fetching from DB");

    // 🔥 Fetch from DB if not cached
    const events = await Event.find()
      .populate("organizer", "name email")
      .populate("participants", "name email");

    const response = {
      success: true,
      count: events.length,
      data: events
    };

    // 🔥 Store in Redis for 60 seconds
    await redisClient.set(
      "all_events",
      JSON.stringify(response),
      { EX: 60 }
    );

    res.json(response);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   REGISTER FOR EVENT
================================= */
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Prevent duplicate registration
    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Capacity check
    if (event.participants.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.participants.push(req.user._id);
    await event.save();

    // 🔥 Invalidate cache after registration
    await redisClient.del("all_events");

    res.json({
      success: true,
      message: "Registered successfully",
      data: event
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   DELETE EVENT
================================= */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only organizer can delete
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();

    // 🔥 Invalidate cache after deletion
    await redisClient.del("all_events");

    res.json({
      success: true,
      message: "Event deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};