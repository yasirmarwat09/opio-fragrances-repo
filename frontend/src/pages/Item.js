import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the URL parameters
import { fetchProductData } from "../utils/script"; // Import functions
import sparkleImage from "../Assets/Best-seller/sparkle.jpg";
import { Link } from "react-router-dom";

import { useState } from "react";

const Item = () => {
  const { productName } = useParams(); // Get the productName from the URL
  const [product, setProduct] = useState(null);

  // Decode the product name in case it is URL encoded
  const decodedProductName = decodeURIComponent(productName);
  console.log("Decoded Product Name:", decodedProductName);

  useEffect(() => {
    // Fetch the product data based on the productName
    const fetchProductData = async (name) => {
      try {
        const response = await fetch(`/product/${name}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductData(decodedProductName); // Call the fetchProductData function with the decoded product name
  }, [decodedProductName]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="breadcrumb-navigation">
        <Link to="/Opio-fragrances">Back To Home</Link>
      </div>
      <div className="product-container" id="product-container">
        {/* Image Gallery */}
        <div className="image-gallery" id="image-gallery">
          <img
            id="featured-image"
            className="featured-image"
            src={product.image} // Assuming you have the product image URL in the product data
            alt={product.name} // Assuming the product data contains a name property
          />
        </div>

        {/* Product Details */}
        <div className="product-details" id="product-details">
          <h1 id="product-title" className="product-title">
            {product.name} {/* Dynamically set product name */}
          </h1>
          <div id="product-price" className="product-price perfume-price-rs">
            {product.price} {/* Dynamically set product price */}
          </div>
          <hr className="divider" />
          <p id="product-description" className="product-description">
            {product.description} {/* Dynamically set product description */}
          </p>
          <div className="disclaimer-box">
            <strong>Disclaimer:</strong>
            We offer fragrances that compete with designer brands, but we do not
            use their exact fragrances or have any affiliation with the designer
            brands or their manufacturers. All trademarks are the property of
            their respective owners.
          </div>
          <div className="action-buttons">
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      <div className="full-description-section" id="full-description-section">
        <h2 className="description-title" id="description-title">
          Description
        </h2>
        <p id="description-paragraph" className="description-paragraph">
          {product.fullDescription}{" "}
          {/* Dynamically set full product description */}
        </p>
        <div id="top-notes" className="fragrance-notes">
          <strong className="note-heading">TOP NOTES:</strong>
          {product.topNotes} {/* Dynamically set top notes */}
        </div>
        <div id="middle-notes" className="fragrance-notes">
          <strong className="note-heading">MIDDLE NOTES:</strong>
          {product.middleNotes} {/* Dynamically set middle notes */}
        </div>
        <div id="base-notes" className="fragrance-notes">
          <strong className="note-heading">BASE NOTES:</strong>
          {product.baseNotes} {/* Dynamically set base notes */}
        </div>
      </div>

      <footer id="footer-content-container">
        {/* Add footer content if needed */}
      </footer>
    </>
  );
};

export default Item;
