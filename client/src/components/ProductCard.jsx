// src/components/ProductCard.jsx
import React from "react";
import "./ProductGallery.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={product.image} alt={product.title} className="product-img" />
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">
        {product.discount ? (
          <>
            <span className="old-price">₹{product.price}</span>{" "}
            ₹{(product.price * (1 - product.discount / 100)).toFixed(0)}
          </>
        ) : (
          <>₹{product.price}</>
        )}
      </p>
      <button className="add-to-cart-btn" onClick={() => onAddToCart(product._id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
