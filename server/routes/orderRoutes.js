const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

// @route POST /api/orders
// @desc Place order from cart with optional coupon and delivery address
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { couponCode, address } = req.body;

    // ✅ Address is required
    if (!address || address.trim() === "") {
      return res.status(400).json({ msg: "Delivery address is required" });
    }

    // 1. Get user’s cart
    const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // 2. Check stock and reduce it
    for (let item of cart.items) {
      const product = await Product.findById(item.productId._id);
      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: `Not enough stock for ${product.title}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // 3. Calculate total price (considering product discount)
    let totalPrice = cart.items.reduce((total, item) => {
      const price = item.productId.price;
      const discount = item.productId.discount || 0;
      const finalPrice = price - (price * discount) / 100;
      return total + finalPrice * item.quantity;
    }, 0);

    // 4. Apply coupon discount (if any)
    let appliedDiscount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (!coupon) return res.status(400).json({ msg: "Invalid coupon code" });
      if (new Date() > new Date(coupon.expiry)) return res.status(400).json({ msg: "Coupon expired" });

      appliedDiscount = coupon.discount;
      totalPrice -= (totalPrice * appliedDiscount) / 100;
    }

    // 5. Create and save the order with delivery address
    const order = new Order({
      userId: req.user.userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalPrice,
      deliveryAddress: address,
      status: "pending",
      createdAt: new Date()
    });

    await order.save();

    // 6. Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      msg: "Order placed successfully",
      order,
      discountApplied: appliedDiscount + "%"
    });
  } catch (err) {
    console.error("Order placement error:", err.message);
    res.status(500).json({ msg: "Order placement failed" });
  }
});

// @route GET /api/orders
// @desc Get user’s past orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err.message);
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
});

// @route PUT /api/orders/update-status/:orderId
// @desc Update order status (admin only)
router.put("/update-status/:orderId", authMiddleware, async (req, res) => {
  const { status } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Unauthorized" });
  }

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ msg: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
