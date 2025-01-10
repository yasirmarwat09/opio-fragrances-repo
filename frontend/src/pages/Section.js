import React from "react";
import "../App.css";
import creativePlush from "../Assets/Best-seller/Creative-PLush.jpg";
import divine from "../Assets/Best-seller/divine.jpg";
import pinkGorgeous from "../Assets/Best-seller/PinkGorgeous.jpg";
import emotion from "../Assets/Best-seller/emotion.jpg";
import orlene from "../Assets/Best-seller/orlene.jpg";
import silverSmoke from "../Assets/Best-seller/silversmoke1.jpg";
import revive from "../Assets/Best-seller/revive1.jpg";
import momentum from "../Assets/Best-seller/momentum.jpg";
import victorious from "../Assets/Best-seller/victorious1.jpg";
import vibrant from "../Assets/Best-seller/vibrant.jpg";
import velvet from "../Assets/Best-seller/velvet.jpg";
import sparkle from "../Assets/Best-seller/sparkle.jpg";

const Section = () => {
  return (
    <>
      <div className="bg-breadcrumb2" >
        <div className="title-page">
          <h2>New Arrival</h2>
        </div>
        <div className="bread-crumb">
          <a href="/" title="home-page">
            Home
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
          <strong>New Arrivals</strong>
        </div>
      </div>
      <section className="best-seller">
        <div className="perfume-section">
          <h2 className="shop-now-heading">Best Seller</h2>
          <div className="perfume-grid">
            <a href="#" className="perfume-item">
              <img src={creativePlush} alt="Plush perfume" />
              <p className="perfume-name">Plush for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={divine} alt="Divine perfume" />
              <p className="perfume-name">Divine for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={pinkGorgeous} alt="Gorgeous perfume" />
              <p className="perfume-name">Gorgeous for women</p>
              <p className="perfume-price">Rs.3,250.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={emotion} alt="Emotion perfume" />
              <p className="perfume-name">Emotion for women</p>
              <p className="perfume-price">Rs.3,250.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={orlene} alt="Orlene perfume" />
              <p className="perfume-name">Orlene for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={silverSmoke} alt="Silver Smoke perfume" />
              <p className="perfume-name">Silver Smoke for men</p>
              <p className="perfume-price">Rs.3,399.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={revive} alt="Revive perfume" />
              <p className="perfume-name">Revive for men</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={momentum} alt="Momentum perfume" />
              <p className="perfume-name">Momentum for men</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={victorious} alt="Victorious perfume" />
              <p className="perfume-name">Victorious for men</p>
              <p className="perfume-price">Rs.4,499.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={vibrant} alt="Vibrant perfume" />
              <p className="perfume-name">Vibrant for men</p>
              <p className="perfume-price">Rs.3,599.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={velvet} alt="Velvet perfume" />
              <p className="perfume-name">Velvet for men</p>
              <p className="perfume-price">Rs.3,999.00</p>
            </a>
            <a href="#" className="perfume-item">
              <img src={sparkle} alt="Sparkle perfume" />
              <p className="perfume-name">Sparkle for men</p>
              <p className="perfume-price">Rs.3,899.00</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section;
