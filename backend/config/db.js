const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://priysh31:3112@cluster0.v80vyxl.mongodb.net/studybuddy"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;