import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState('');

  const handleIncrease = async (productId) => {
  await axios.post('http://localhost:5000/cart/increase', { productId }, { withCredentials: true });
  fetchCart(); // refresh after change
};
  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/cart', { withCredentials: true });
      setCartItems(res.data);
      const totalPrice = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalPrice);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setMsg('Please login to view cart.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleReduce = async (productId) => {
    await axios.post('http://localhost:5000/cart/reduce', { productId }, { withCredentials: true });
    fetchCart(); // refresh cart
  };

  const handleDelete = async (productId) => {
    await axios.post('http://localhost:5000/cart/delete', { productId }, { withCredentials: true });
    fetchCart();
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {msg && <div className="alert alert-warning">{msg}</div>}

      <div className="row">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.desc}</p>
                  <p className="card-text fw-bold">Category: {item.category}</p>
                  <p className="card-text fw-bold">Price: ₹{item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <p className="card-text text-muted">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                     <button className="btn btn-secondary" onClick={() => handleIncrease(item._id)}>
                      Increase
                    </button>
                    <button className="btn btn-warning" onClick={() => handleReduce(item._id)}>
                      Reduce
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="row mt-4">
          <div className="col text-center">
            <h4>Total Amount: ₹{total}</h4>
            <button className="btn btn-success mt-2">Checkout</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
