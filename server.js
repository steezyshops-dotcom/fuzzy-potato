const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load env vars (MONGO_URI, JWT_SECRET, etc.)
connectDB(); // connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/portfolios", require("./routes/portfolioRoutes")); // new portfolio routes

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express Backend!!!" });
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


