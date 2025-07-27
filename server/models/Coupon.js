const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number, // 10 = 10% off
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Coupon", couponSchema);
