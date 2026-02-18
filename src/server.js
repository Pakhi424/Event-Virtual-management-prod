const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // env load first

const app = express();

require("dotenv").config();
// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Health check route (important for deployment)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler (optional but good practice)
// const errorHandler = require("./middleware/error.middleware");
// app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});