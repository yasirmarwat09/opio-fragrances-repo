import React from "react";
import { Link } from "react-router-dom"; 
import "../App.css"; 

const Footer = () => {
  return (
    <footer className="footer" id="footer-content-container">
      <div className="footer-column">
        <h3>Services</h3>
        <ul>
        <li><Link to="/Opio-fragrances">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/Contact-page">Contact Us</Link></li>
          <li><Link to="#">Blog</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Collection</h3>
        <ul>
        <li><Link to="/gift-sets">Gift Sets</Link></li>
          <li><Link to="/most-popular">Most Popular</Link></li>
          <li><Link to="/just-arrived">Just Arrived</Link></li>
          <li><Link to="/buy-samples">Buy Samples</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Contact Information</h3>
        <ul>
          <li>
            <a href="phone">
              <i className="fas fa-phone"></i> +92335-9399351
            </a>
          </li>
          <li>
            <a href="envelop">
              <i className="fas fa-envelope"></i> info@opiofragrances.pk
            </a>
          </li>
          <li>
            <a href="location">
              <i className="fas fa-map-marker-alt"></i> 1201 Broadway Suite 600
            </a>
          </li>
        </ul>
      </div>

      <hr />
      <div className="footer-copyright">
        <p>Copyright 2024 | Opio fragrances</p>
      </div>
    </footer>
  );
};

export default Footer;
