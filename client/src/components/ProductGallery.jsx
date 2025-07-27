import logo from "../assets/timezone-logo.png"; // Adjust if this path differs
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/ProductGallery.css";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Men", "Women", "Unisex", "Luxury", "Smart", "Sport", "Sale"];

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();

  const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    
    // Temporarily add more demo watches to display
    const mockProducts = [
      ...res.data,
      {
        _id: "2",
        title: "Titan Zeal AMOLED",
        brand: "Titan",
        price: 13995,
        discount: 71,
        description: "Unisex smartwatch with vibrant AMOLED display.",
        strapMaterial: "Silicone",
        movement: "Quartz",
        dialShape: "Square",
        waterResistant: true,
        image: "https://m.media-amazon.com/images/I/61YzF9cNADL._AC_UF894,1000_QL80_.jpg",
      },
      {
        _id: "3",
        title: "Fastrack Stunners Blue Dial",
        brand: "Fastrack",
        price: 1495,
        discount: 20,
        description: "Guys' analog watch with stylish blue dial.",
        strapMaterial: "Metal",
        movement: "Quartz",
        dialShape: "Round",
        waterResistant: false,
        image: "https://m.media-amazon.com/images/I/71Yk9fbMM+L._UL1500_.jpg",
      },
    ];

    setProducts(mockProducts);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};


  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add to cart.");
      return navigate("/auth");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Could not add product");
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (activeCategory !== "All") {
      if (activeCategory === "Sale") {
        filtered = filtered.filter((p) => p.discount > 0);
      } else {
        filtered = filtered.filter((p) => p.category === activeCategory);
      }
    }

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-title">
        <img src={logo} alt="TimeZone Logo" className="gallery-logo" />
        <span>TimeZone Luxury Collection</span>
      </div>


      <div className="filter-bar">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === activeCategory ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {getFilteredProducts().map((product) => {
          const finalPrice = product.discount
            ? (product.price * (1 - product.discount / 100)).toFixed(0)
            : product.price;

          return (
            <div className="product-card" key={product._id}>
              <div className="product-img-box">
                <img src={product.image} alt={product.title} className="product-img" />
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>

              <div className="product-details">
                <h3 className="product-title">{product.brand} - {product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-attributes">
                  <p><strong>Strap:</strong> {product.strapMaterial}</p>
                  <p><strong>Movement:</strong> {product.movement}</p>
                  <p><strong>Dial:</strong> {product.dialShape}</p>
                  <p><strong>Water Resistant:</strong> {product.waterResistant ? "Yes" : "No"}</p>
                </div>
                <div className="price-section">
                  {product.discount > 0 ? (
                    <>
                      <span className="old-price">₹{product.price}</span>{" "}
                      <span className="final-price">₹{finalPrice}</span>
                    </>
                  ) : (
                    <span className="final-price">₹{product.price}</span>
                  )}
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
