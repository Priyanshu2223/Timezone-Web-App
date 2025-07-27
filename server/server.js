const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemon=require('nodemon');
const connectMongo = require("./config/mongo");




const app = express(); // ✅ Initialize app first!

// ✅ Middleware
app.use(cors());
app.use(express.json());

const orderRoutes = require('./routes/orderRoutes');
app.use("/api/orders", orderRoutes);

// ✅ Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const couponRoutes = require('./routes/couponRoutes');
app.use("/api/coupons", couponRoutes);


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("✅ LocalKart Backend is Running Successfully");
});

// ✅ Connect DB & Start Server
const PORT = process.env.PORT || 5000;
connectMongo().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
