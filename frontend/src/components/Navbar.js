import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addMenuEventListeners,
  addSearchEventListeners,
  addAuthEventListeners,
  addCartEventListeners,
  checkScreenSizeAndApply,
  updateCart,
  assignCheckoutFunctionality,
  pollForButtons,
} from "../utils/script";
import "@fortawesome/fontawesome-free/css/all.css";
import "../App.css";
import logo from "../Assets/logo-img.png";
import sparkle from "../Assets/Best-seller/sparkle.jpg";

const Navbar = () => {
  useEffect(() => {
    addMenuEventListeners();
    addSearchEventListeners();
    addCartEventListeners();
    addAuthEventListeners();
    addAuthEventListeners();
    checkScreenSizeAndApply();
    updateCart();
    assignCheckoutFunctionality();
    pollForButtons();
  }, []);
  return (
    <>
      <header id="header-content-container">
        <nav>
          <div className="nav-container">
            {/* Logo and buttons */}
            <div className="logo-buttons">
              <button className="toggle-menu-btn search-button">
                <i className="fa fa-bars"></i>
              </button>
              <button className="toggle-btn search-button">
                <i className="fa fa-search"></i>
              </button>
            </div>

            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <input type="text" placeholder="Search skincare products" />
            </div>

            {/* Right side buttons */}
            <div className="right-side-buttons">
              {/* Login Button */}
              <button className="login-btn">
                <i className="fa-regular fa-user"></i>
              </button>

              {/* Cart Container */}
              <div className="cart-container">
                <div className="cart-counter">0</div>
                <a href="#" className="cart-icon">
                  <i className="fa-solid fa-bag-shopping"></i>
                </a>
              </div>
            </div>
          </div>
          {/* Search Modal (Overlay) */}
          <div className="search-overlay">
            <div className="search-modal">
              <input
                type="text"
                id="search-input"
                placeholder="Type to search..."
              />
              <button id="search-close-btn" className="search-close-btn">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          {/* Cart Overlay */}
          <div className="cart-overlay" id="cart-overlay">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <span className="cart-count">(0 items)</span>
              <button id="close-cart" class="close-cart">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="cart-items">
              <div className="cart-item">
                <div className="cart-left">
                  <img
                    src={sparkle}
                    alt="Product Image"
                    class="cart-item-img"
                  />
                  <span className="cart-item-name">Sample Product</span>
                </div>
                <span className="cart-item-price">Rs. 1000</span>
                <button className="delete-cart-item">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-amount" id="total-amount">
                  Rs. 0
                </span>
              </div>
              <div className="cart-buttons">
                <button className="cart-home-btn">Home</button>
                <button className="cart-checkout-btn">Checkout</button>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="nav-pages">
            <Link to="/Opio-fragrances">Home</Link>
            <Link to="/Section">New Arrivals</Link>
            <Link to="/Section">Perfumes</Link>
            <Link to="/Section">Deodorants</Link>
            <Link to="/Section">Body Mist</Link>
            <Link to="/Contact-page">Contact Us</Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
