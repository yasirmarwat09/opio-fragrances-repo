import React from "react";
import "../App.css";
import sparkle from "../Assets/Best-seller/sparkle.jpg";

const Checkout = () => {
  return (
    <div className="container1">
      <div className="checkout-container">
        {/* Contact Section */}
        <div className="contact">
          <h2 className="contact-heading">Contact</h2>
          <a href="/login" className="login-btn" title="Login">
            Login
          </a>
        </div>

        <div className="space"></div>

        {/* Email Section */}
        <div className="email-sec">
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <br />
            <br />
          </div>
          <form action="#" method="post">
            <input type="checkbox" id="subscribe" name="subscribe" />
            <label htmlFor="subscribe">Email me with news and offers</label>
          </form>
        </div>

        {/* Delivery Section */}
        <div className="delivery-container">
          <div className="delivery">
            <h2>Delivery</h2>
            <select
              id="country"
              name="country"
              aria-label="Select your country"
              required
            >
              <option value="" disabled selected>
                Country/Region
              </option>
              <option value="pk">Pakistan</option>
            </select>
            <br />
            <br />
            <div className="delivery-details">
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="First Name (optional)"
              />
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Last Name"
                required
              />
              <br />
              <br />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                required
              />
              <br />
              <br />
              <input
                type="text"
                id="apartment"
                name="apartment"
                placeholder="Apartment, suite (optional)"
              />
              <br />
              <br />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                required
              />
              <input
                type="text"
                id="postal"
                name="postal"
                placeholder="Postal Code (Optional)"
                required
              />
              <br />
              <br />
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                required
              />
              <br />
              <br />
              <div className="checkbox-container save-info">
                <input type="checkbox" id="save" name="save" />
                <label htmlFor="save">
                  Save this information for next time
                </label>
              </div>
              <br />
            </div>
          </div>

          {/* Shipping Section */}
          <div className="shipping-section">
            <h2>Shipping</h2>
            <form action="#">
              <div className="payment-method">
                <label htmlFor="shipping-method"></label>
                <input
                  type="text"
                  id="shipping-method"
                  name="shipping-method"
                  value="Shipping rate: Rs.199.00"
                  readOnly
                />
              </div>
            </form>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <h2>Payment</h2>
            <form action="#" method="post">
              <div className="payment-method">
                <p>All transactions are secured and encrypted.</p>
                <label htmlFor="payment-method">Payment Method</label>
                <input
                  type="text"
                  id="payment-method"
                  name="payment-method"
                  value="Cash on Delivery"
                  readOnly
                />
              </div>
            </form>
          </div>

          {/* Complete Order Button */}
          <div className="complete-order">
            <button type="submit" className="complete-order-btn">
              Complete Order
            </button>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="additional-content">
        <h2>Order Summary</h2>
        <p>Your order details will appear here.</p>

        {/* Subtotal Section */}
        <div className="summary-details">
          <div className="summary-item">
            <span>Subtotal:</span>
            <span id="subtotal-amount">Rs. 1000.00</span>
          </div>
          <div className="summary-item">
            <span>Shipping Charges:</span>
            <span id="shipping-amount">Rs. 199.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
