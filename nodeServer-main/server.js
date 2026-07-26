// server.js
// ==================
// This file demonstrates a minimal Express server.  It is intentionally
// verbose so that a beginner can read the code and understand every
// operation that takes place.  The comments are written in plain English
// and are meant to be educational rather than production‑grade.

// 1️⃣  Import the Express module
// ------------------------------
// Express is a lightweight web framework for Node.js.  It provides a
// simple API for routing, middleware, and HTTP utilities.  We import it
// using CommonJS `require` because the repository uses the classic
// Node.js module system.
const express = require("express");
const mongoose = require("mongoose");

// 2️⃣  Create an Express application instance
// ------------------------------------------
// Calling `express()` returns an application object that we can use to
// register routes, middleware, and start the HTTP server.  Think of it
// as a container that holds all of the configuration for our web
// application.
const app = express();

// 3️⃣  Connect to MongoDB
// -----------------------
// We use Mongoose to connect to a MongoDB instance.  The connection
// string can be supplied via the environment variable `MONGO_URI`.
// If it is not provided we fall back to a local instance.
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/nodeserver";
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 4️⃣  Middleware for parsing JSON
// --------------------------------
// Express ships with a built‑in JSON parser.  This middleware parses
// incoming request bodies that have a `Content-Type: application/json`
// header and makes the resulting object available on `req.body`.
app.use(express.json());

// 5️⃣  Import and mount user routes
// ---------------------------------
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// 6️⃣  Define a simple root route
// ------------------------------
app.get("/", (req, res) => {
  res.send("Hello from EC2!");
});

// 7️⃣  Start the server
// ---------------------
// The default port is now 3333 unless overridden by the environment
// variable `PORT`.
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 8️⃣  Export the app
// -------------------
module.exports = app;

// ------------------------------------------------------------
// End of file
// ------------------------------------------------------------