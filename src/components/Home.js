import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const categories = [
  {
    name: 'Men',
    image: 'https://res.cloudinary.com/dkty1thga/image/upload/v1751194740/MenModel_ds5ck1.jpg',
  },
  {
    name: 'Women',
    image: 'https://res.cloudinary.com/dkty1thga/image/upload/v1751194877/WomenModel_p59cjb.jpg',
  },
  {
    name: 'Kids',
    image: 'https://res.cloudinary.com/dkty1thga/image/upload/v1751194928/KidsModel_uhzncm.jpg',
  },
];
  const [msg, setMsg] = useState('Loading...');
   const navigate=useNavigate()
    const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://noblefoot-backend.onrender.com/checkSession',{withCredentials:true});
        setMsg(response.data.msg);
        console.log("Message:", response.data.msg);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setMsg("Failed to load message.");
      }
    };

    fetchData();
    const fetchProducts = async () =>{
      try {
        const response = await axios.get('https://noblefoot-backend.onrender.com/HP');
        setProducts(response.data)
      }catch(err){
        
      }
    }
    fetchProducts()
  }, []);

const handleSubmit = async (e, productId) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://noblefoot-backend.onrender.com/cart/add', { productId }, {
      withCredentials: true,
    });

    console.log('Product added to cart:', res.data);

    if (res.data.success) {
      // ✅ Redirect to the cart page
      navigate('/cart');
    } else {
      alert("Failed to add to cart");
    }
  } catch (err) {
    console.error('Error adding product to cart:', err);
    // Optional: Redirect to login/logout if session expired
    navigate('/login');
  }
};

  
   async function handleClickMen(category){
      const response = await axios.get(`https://noblefoot-backend.onrender.com/products/${category.toLowerCase()}`,{withCredentials:true});
      navigate('/products', { state: response.data });

  }  
  
  function handleSign(){
    navigate('/signup')
  }

  return (
    <div className="homepage bg-light">

      {/* Hero Section */}
      <section
        style={{ backgroundColor: 'cyan', height: '60vh' }}
        className="hero d-flex align-items-center justify-content-center text-center text-dark"
      >
        <div>
          <h1 className="display-4 fw-bold">Step into Style</h1>
          <p className="lead">Find the perfect shoes for every occasion.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-5">
  <h2 className="text-center mb-4">Shop by Category</h2>
  <div className="row g-4 justify-content-center">
    {categories.map((cat, idx) => (
      <div key={idx} className="col-md-4">
        <div className="card shadow-sm h-100 category-card">
          <img
            src={cat.image}
            className="card-img-top"
            alt={cat.name}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{cat.name}</h5>
            <button
              className="btn btn-success"
              onClick={() => handleClickMen(cat.name)}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Featured Products */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Featured Shoes</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.desc}</p>
                  <p className="card-text fw-bold">₹{product.price}</p>
                  <button className="btn btn-success" onClick={(e) => handleSubmit(e, product._id)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-white text-center py-5 bg-success">
        <h2 className="mb-3">Join Our Club</h2>
        <p>Get exclusive discounts and new arrivals straight to your inbox.</p>
        <button className="btn btn-light" onClick={handleSign}>Sign Up</button>
      </section>
    </div>
  );
};

export default HomePage;
