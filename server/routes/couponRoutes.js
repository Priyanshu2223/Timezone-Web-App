const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Not authorized" });

  const { code, discount, expiry } = req.body;

  try {
    const coupon = new Coupon({ code, discount, expiry });
    await coupon.save();
    res.status(201).json({ msg: "Coupon created", coupon });
  } catch (err) {
    res.status(500).json({ msg: "Error creating coupon", error: err.message });
  }
});

module.exports = router;
