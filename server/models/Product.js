const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // % off
  description: { type: String },
  category: {
    type: String,
    enum: ["Men", "Women", "Unisex", "Luxury", "Sport", "Smart"],
    default: "Luxury"
  },
  image: { type: String, required: true },
  stock: { type: Number, default: 10 },
  strapMaterial: {
    type: String,
    enum: ["Leather", "Metal", "Rubber", "NATO", "Ceramic", "Silicone"]
  },
  dialShape: {
    type: String,
    enum: ["Round", "Square", "Rectangle", "Tonneau"]
  },
  movement: {
    type: String,
    enum: ["Quartz", "Automatic", "Mechanical", "Solar"]
  },
  waterResistant: { type: Boolean, default: false },
  warrantyYears: { type: Number, default: 2 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
