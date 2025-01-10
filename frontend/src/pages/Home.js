import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "../App.css";
import { useParams } from "react-router-dom"; // Import useParams to get the URL parameters
import {
  initializeHeroSection,
  initializeShopNowSection,
  fetchProductData,
} from "../utils/script";
import { Link } from "react-router-dom";
import image1 from "../Assets/1-hero-img.jpg";
import image2 from "../Assets/2-hero-img.jpg";
import image3 from "../Assets/3-hero-img.jpg";
import HeroImgResized1 from "../Assets/1-hero-img-resized.jpg";
import HeroImgResized2 from "../Assets/2-hero-img-resized.jpg";
import HeroImgResized3 from "../Assets/3-hero-img-resized.jpg";
import image4 from "../Assets/for-men-shopnow.jpg";
import image5 from "../Assets/for-women-shopnow.jpg";
import image6 from "../Assets/bodymist-shopnow.jpg";
import image7 from "../Assets/deo-shopnow.jpg";
import image8 from "../Assets/most-popular-shopnow.jpg";
import creativePlush from "../Assets/Best-seller/Creative-PLush.jpg";
import divine from "../Assets/Best-seller/divine.jpg";
import PinkGorgeous from "../Assets/Best-seller/PinkGorgeous.jpg";
import Emotion from "../Assets/Best-seller/emotion.jpg";
import orlene from "../Assets/Best-seller/orlene.jpg";
import silversmoke1 from "../Assets/Best-seller/silversmoke1.jpg";
import revive1 from "../Assets/Best-seller/revive1.jpg";
import momentum from "../Assets/Best-seller/momentum.jpg";
import victorious1 from "../Assets/Best-seller/victorious1.jpg";
import vibrant from "../Assets/Best-seller/vibrant.jpg";
import velvet from "../Assets/Best-seller/velvet.jpg";
import sparkle from "../Assets/Best-seller/sparkle.jpg";
import bottomHeroImage from "../Assets/bottom-hero-img.jpg";
import MobileBottomHeroImg from "../Assets/mobile-size-bottom-hero-img.jpg";

const heroImages = [image1, image2, image3];
const heroImagesResized = [HeroImgResized1, HeroImgResized2, HeroImgResized3];

const Home = () => {
  const { productName } = useParams(); // Get the productName from the URL
  useEffect(() => {
    initializeHeroSection();
    initializeShopNowSection();
    fetchProductData(productName); // Call the fetchProductData function with the product name
  }, [productName]); // Trigger when the productName changes
  return (
    <main>
      <section className="hero">
        <div className="slider">
          <div className="slides">
            <div className="slide">
              <img className="hero-img" src={image1} alt="" />
            </div>
            <div className="slide">
              <img className="hero-img" src={image2} alt="" />
            </div>
            <div className="slide">
              <img className="hero-img" src={image3} alt="" />
            </div>
          </div>
          <div className="navigation">
            <button className="nav-btn" data-index="0"></button>
            <button className="nav-btn" data-index="1"></button>
            <button className="nav-btn" data-index="2"></button>
          </div>
        </div>
      </section>
      <section className="shop-now-container">
        <h2 className="shop-now-heading">Shop Now</h2>
        <div className="shop-now-container-wrapper">
          <div className="shop-now-wrapper">
            <div className="shop-now-section">
              <a href="">
                <img src={image4} alt="Men perfume section" />
                <p>For Men</p>
              </a>
              <a href="#">
                <img src={image5} alt="Women perfume section" />
                <p>For Women</p>
              </a>
              <a href="#">
                <img src={image6} alt="Body mist section" />
                <p>Body Mist</p>
              </a>
              <a href="#">
                <img src={image7} alt="Deo section" />
                <p>Deo</p>
              </a>
              <a href="#">
                <img src={image8} alt="Most popular section" />
                <p>Most Popular</p>
              </a>
            </div>
            <button className="left-btn">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="right-btn">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
      <section className="best-seller">
        <div className="perfume-section">
          <h2 className="shop-now-heading">Best Seller</h2>
          <div className="perfume-grid">
            <Link
              to={`/Item/${encodeURIComponent("Plush for women")}`}
              className="perfume-item"
            >
              <img src={creativePlush} alt="plush perfume" />
              <p className="perfume-name">Plush for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Divine for women")}`}
              className="perfume-item"
            >
              <img src={divine} alt="perfume 2" />
              <p className="perfume-name">Divine for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Gorgeous for women")}`}
              className="perfume-item"
            >
              <img src={PinkGorgeous} alt="perfume 3" />
              <p className="perfume-name">Gorgeous for women</p>
              <p className="perfume-price">Rs.3,250.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Emotion for women")}`}
              className="perfume-item"
            >
              <img src={Emotion} alt="perfume 4" />
              <p className="perfume-name">Emotion for women</p>
              <p className="perfume-price">Rs.3,250.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Orlene for women")}`}
              className="perfume-item"
            >
              <img src={orlene} alt="perfume 5" />
              <p className="perfume-name">Orlene for women</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Silver Smoke for men")}`}
              className="perfume-item"
            >
              <img src={silversmoke1} alt="perfume 6" />
              <p className="perfume-name">Silver Smoke for men</p>
              <p className="perfume-price">Rs.3,399.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Revive for men")}`}
              className="perfume-item"
            >
              <img src={revive1} alt="perfume 7" />
              <p className="perfume-name">Revive for men</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Momentum for men")}`}
              className="perfume-item"
            >
              <img src={momentum} alt="perfume 8" />
              <p className="perfume-name">Momentum for men</p>
              <p className="perfume-price">Rs.3,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Victorious for men")}`}
              className="perfume-item"
            >
              <img src={victorious1} alt="perfume 9" />
              <p className="perfume-name">Victorious for men</p>
              <p className="perfume-price">Rs.4,499.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Vibrant for men")}`}
              className="perfume-item"
            >
              <img src={vibrant} alt="perfume 10" />
              <p className="perfume-name">Vibrant for men</p>
              <p className="perfume-price">Rs.3,599.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Velvet for men")}`}
              className="perfume-item"
            >
              <img src={velvet} alt="perfume 11" />
              <p className="perfume-name">Velvet for men</p>
              <p className="perfume-price">Rs.3,999.00</p>
            </Link>

            <Link
              to={`/Item/${encodeURIComponent("Sparkle for men")}`} // Correctly encode the product name
              className="perfume-item"
            >
              <img src={sparkle} alt="perfume 12" />
              <p className="perfume-name">Sparkle for men</p>
              <p className="perfume-price">Rs.3,899.00</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="bottom-hero-img">
        <img src={bottomHeroImage} alt="bottom hero img" />
      </div>
      <h2 className="follow-us">Follow us on Instagram</h2>
      <h3 className="insta-account">@opiofragrances</h3>
    </main>
  );
};

export default Home;
