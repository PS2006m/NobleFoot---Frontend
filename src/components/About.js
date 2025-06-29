import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">About Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4 shadow-sm">
            <h4>Welcome to NobleFoot</h4>
            <p>
              At <strong>NobleFoot</strong>, we believe that the right pair of shoes can change your walk—and your world.
              Founded in 2025, we are dedicated to providing premium quality shoes for Men, Women, and Kids at affordable prices.
            </p>

            <h5 className="mt-4">👣 Our Mission</h5>
            <p>
              To make stylish, durable, and comfortable footwear accessible to everyone. We strive to blend fashion and function
              to give our customers the confidence to step up and stand out.
            </p>

            <h5 className="mt-4">💼 What We Offer</h5>
            <ul>
              <li>Wide variety of shoes for every age and lifestyle</li>
              <li>Trusted brands and in-house quality-tested styles</li>
              <li>Easy online shopping experience with secure payments</li>
              <li>Fast shipping and reliable customer support</li>
            </ul>

            <h5 className="mt-4">🌍 Our Vision</h5>
            <p>
              To become India’s most loved online shoe destination, where every step our customers take is a step in style and comfort.
            </p>

            <p className="mt-4 text-muted">
              Thank you for choosing <strong>NobleFoot</strong>. Walk with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
