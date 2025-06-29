import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Product = () => {
  const navigate = useNavigate();
  const { category } = useParams();  // get :category from route (if exists)
  const location = useLocation();
  const passedData = location.state; 
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://noblefoot-backend.onrender.com/cart/add', { productId }, {
        withCredentials: true
      });
      console.log('Product added to cart:', res.data);
      if (res.data.success) {
        navigate('/');
      }
    } catch (err) {
      navigate('/logout');
      console.error('Error adding product to cart:', err);
    }
  };

  useEffect(() => {
    if (passedData && Array.isArray(passedData)) {
      // ✅ Show passed data
      setProducts(passedData);
      setMsg("Showing filtered products");
    } else {
      // ✅ Fetch all products
      const fetchAllProducts = async () => {
        try {
          const res = await axios.get('https://noblefoot-backend.onrender.com/products');
          setProducts(res.data);
          setMsg("Showing all products");
        } catch (err) {
          console.error('Error fetching products:', err);
          setMsg("Failed to load products");
        }
      };

      fetchAllProducts();
    }
  }, [passedData]);

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <form onSubmit={(e) => handleSubmit(e, product._id)}>
              <div className="card h-100">
                <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.desc}</p>
                  <p className="card-text fw-bold">₹{product.price}</p>
                  <p className="card-text fw-bold">{product.category}</p>
                  <button type="submit" className="btn btn-primary">Add To Cart</button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
