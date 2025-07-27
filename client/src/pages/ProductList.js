import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // Optional styling
import parle from '../Images/Parle.jpg';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product-list">
      <h2>🛒 Our Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product._id} className="card">
            <img src={parle} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
