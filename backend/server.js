const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 1. Connect to Database directly
connectDB();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Test Route
app.get("/", (req, res) => {
  res.json({ message: "Gaming Marketplace API is running on Vercel" });
});

// 4. Local Development Server (Vercel will ignore this block)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// 5. Export for Vercel Serverless
module.exports = app;
