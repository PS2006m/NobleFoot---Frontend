import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">NobleFoot Headquarters</h4>

            <p><strong>📍 Address:</strong> 123 Fashion Street, Ahmedabad, India</p>
            <p><strong>📞 Phone:</strong> +1234567890</p>
            <p><strong>📧 Email:</strong> prathamshah485@gmail.com</p>

            <hr />

            <h5 className="mt-3">Business Hours</h5>
            <ul className="list-unstyled">
              <li>Monday - Friday: 10:00 AM – 7:00 PM</li>
              <li>Saturday: 11:00 AM – 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
