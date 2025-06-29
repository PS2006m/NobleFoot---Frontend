import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const [image, setImage] = useState(null); // separate image state
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('image', image); // add image file

    try {
      const res = await axios.post('https://noblefoot-backend.onrender.com/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message);
      setFormData({ name: '', price: '', description: '', category: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Error adding product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input type="file" name="image" className="form-control" onChange={handleImageChange} required />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
