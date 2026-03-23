require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");

const app = express();


// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/tasks", taskRoutes);

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//console.log(process.env.MONGO_URI);