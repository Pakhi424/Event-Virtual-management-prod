const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["organizer", "attendee"], default: "attendee" }
});

module.exports = mongoose.model("User", userSchema);