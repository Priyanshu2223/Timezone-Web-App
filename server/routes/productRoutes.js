const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/products
// @desc    Public - Fetch all products with optional search, filters, sort
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy, order } = req.query;

    let query = {};

    // 🔍 Search by keyword in title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 📂 Filter by category
    if (category) {
      query.category = category;
    }

    // 💸 Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // 🔽 Sorting
    let sortOptions = {};
    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      sortOptions[sortBy] = sortOrder;
    }

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (err) {
    console.error("Product fetch error:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/products
// @desc    Admin only - Add a new product
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const {
    title,
    brand,
    price,
    discount,
    description,
    category,
    image,
    stock,
    strapMaterial,
    dialShape,
    movement,
    waterResistant,
    warrantyYears
  } = req.body;

  try {
    const newProduct = new Product({
      title,
      brand,
      price,
      discount,
      description,
      category,
      image,
      stock,
      strapMaterial,
      dialShape,
      movement,
      waterResistant,
      warrantyYears
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Product add error:", err.message);
    res.status(500).json({ msg: "Failed to add product", error: err.message });
  }
});

module.exports = router;
