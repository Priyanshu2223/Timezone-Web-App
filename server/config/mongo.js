const mongoose = require('mongoose');
require("dotenv").config();


const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
  }
};

module.exports = connectMongo;
