const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  eventDate: {
    type: Date,
    required: true,
    index: true
  },

  capacity: {
  type: Number,
  required: true
  },  
  
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);