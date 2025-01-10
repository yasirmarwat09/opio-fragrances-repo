import React, { useEffect } from "react";
import "../App.css";
// import {
//   assignContactFormFunctionality,
//   pollForContactForm,
// } from "../utils/script";
import contactImage from "../Assets/contact-us-page-image.jpg"; // Adjust path as needed
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure Font Awesome CSS is imported

const ContactPage = () => {
  // useEffect(() => {
  //   assignContactFormFunctionality();
  //   pollForContactForm();
  // }, []);
  return (
    <>
      <div className="breadcrumb-container">
        <div className="breadcrumb-contact">
          <div className="bg-breadcrumb">
            <div className="title-page">
              <h2>Contact</h2>
            </div>
            <div className="bread-crumb">
              <a href="/" title="home-page">
                Home
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </a>
              <strong>Contact</strong>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-info">
        <h1 className="contact-us-heading shop-now-heading">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div className="details">
                <strong>Address</strong>
                <p>Suite 600, Liaqat Road, Rawalpindi</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div className="details">
                <strong>Phone Number</strong>
                <p>+92335 9399351</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div className="details">
                <strong>Email</strong>
                <p>
                  <a href="mailto:info@opiofragrances.pk">
                    info@opiofragrances.pk
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="contact-image">
            <img src={contactImage} alt="Contact" />
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h2 className="shop-now-heading">Send Us a Message</h2>
        <form action="#" method="post">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
          </div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <button className="contact-page-submit-button" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default ContactPage;
