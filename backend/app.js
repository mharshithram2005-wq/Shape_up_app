const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const userStatusRoutes = require("./routes/userStatusRoutes.js");
const UserMealPlanRoutes = require("./routes/UserMealPlanRoutes.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5123;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/user", userStatusRoutes);
app.use("/api/user", UserMealPlanRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`✅ Server started on port ${port}`));
