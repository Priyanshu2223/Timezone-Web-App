const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// @route GET /api/cart
// @desc Get current user's cart
router.get("/", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId");
  res.json(cart || { items: [] });
});

// @route POST /api/cart/add
// @desc Add a product to cart
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = new Cart({ userId: req.user.userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // already in cart, update quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // new item
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// @route DELETE /api/cart/remove/:productId
// @desc Remove product from cart
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user.userId });
  if (!cart) return res.status(404).json({ msg: "Cart not found" });

  cart.items = cart.items.filter(
    item => item.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
});

module.exports = router;
