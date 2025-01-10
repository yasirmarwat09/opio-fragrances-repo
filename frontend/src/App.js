import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact-page";
import Section from "./pages/Section";
import Item from "./pages/Item";

import "./App.css";
import Checkout from "./pages/Checkout";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Opio-fragrances" element={<Home />} />
          <Route path="/Contact-page" element={<Contact />} />
          <Route path="/Section" element={<Section />} />
          <Route path="/Item/:productName" element={<Item />} />{" "}
          {/* Dynamic route for item page */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
