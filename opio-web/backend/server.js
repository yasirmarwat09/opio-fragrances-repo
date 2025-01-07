import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(
//   "mongodb+srv://Yasir:Aliza1965@opio-web.4u7pr.mongodb.net/OPIO-WEBSITE"
// );

// local database
mongoose.connect("mongodb://127.0.0.1:27017/OPIO-WEB");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define the product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  introduction: String,
  description: String,
  topNotes: [String],
  middleNotes: [String],
  baseNotes: [String],
});

const Product = mongoose.model("Product", productSchema, "products");

// Define the cart item schema and model
const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 }, // Store the total price of the product
});

const CartItem = mongoose.model("CartItem", cartItemSchema, "cart");

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "../../")));

// Route to render the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "index.html"));
});

// Route to fetch product details by name
app.get("/product/:name", async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name).trim();
    const product = await Product.findOne({
      name: new RegExp(`^${productName}$`, "i"),
    }).lean(); // Use lean query for better performance when you don't need Mongoose instance

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to fetch the current cart
app.get("/cart", async (req, res) => {
  try {
    const cart = await CartItem.find({});
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error loading cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to add product to the cart
// Route to add product to the cart
// Route to add product to the cart
// // Serve static files from the React build folder
// app.use(express.static(path.join(__dirname, "../../frontend/build")));

// // Serve the React app for all other routes
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
// });

app.post("/add-to-cart", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing product details" });
    }

    // Calculate total price for the product (quantity * price)
    const totalPrice = price;

    // Check if the product already exists in the cart
    let cartItem = await CartItem.findOne({ name, image });

    if (cartItem) {
      // If the product already exists, update the quantity and total price
      cartItem.quantity += 1;
      cartItem.totalPrice = cartItem.quantity * price;
    } else {
      // Create a new cart item document if it doesn't exist
      cartItem = new CartItem({
        name,
        price,
        image,
        quantity: 1,
        totalPrice,
      });
    }

    await cartItem.save(); // Save the updated or new cart item

    // Return the updated cart (all items)
    const cart = await CartItem.find({});
    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to remove product from cart
app.delete("/remove-from-cart/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const cartItem = await CartItem.findByIdAndDelete(productId);

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Return the updated cart (all remaining items)
    const cart = await CartItem.find({});
    res.json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to update product quantity in cart
app.put("/update-cart/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cartItem = await CartItem.findById(productId);

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update quantity and total price
    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.quantity * cartItem.price;

    await cartItem.save(); // Save updated cart item

    // Return the updated cart (all items)
    const cart = await CartItem.find({});
    res.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to serve checkout.html and send cart data
// Route to serve checkout.html and send cart data
// Route to serve checkout.html and send cart data
// Route to serve the checkout page (HTML)
app.get("/checkout", async (req, res) => {
  try {
    // Fetch the cart items from the database, only get the necessary fields
    const cart = await CartItem.find({}).select("totalPrice");

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Calculate the subtotal (sum of all products' totalPrice)
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.totalPrice;
    });

    // Set delivery charges (this could be dynamic based on some criteria)
    const shippingCharges = 199;

    // Calculate the total (subtotal + shippingCharges)
    const totalAmount = subtotal + shippingCharges;

    // Send the checkout.html file located in the root folder
    res.sendFile(path.join(__dirname, "../../", "checkout.html")); // Correct path to checkout.html
  } catch (error) {
    console.error("Error loading checkout page:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to fetch cart data (JSON) for the checkout page
app.get("/checkout-data", async (req, res) => {
  try {
    // Fetch the cart items from the database, only get the necessary fields
    const cart = await CartItem.find({}).select("totalPrice");

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Calculate the subtotal (sum of all products' totalPrice)
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.totalPrice;
    });

    // Set delivery charges (this could be dynamic based on some criteria)
    const shippingCharges = 199;

    // Calculate the total (subtotal + shippingCharges)
    const totalAmount = subtotal + shippingCharges;

    // Send the cart data as JSON response
    res.json({
      subtotal,
      shippingCharges,
      totalAmount,
    });
  } catch (error) {
    console.error("Error loading checkout data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
//for saving order details
//for saving order details
//for saving order details
//for saving order details

// Order Schema
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true }, // Add orderNumber field to the schema
  userData: {
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    apartment: String,
    city: String,
    postal: String,
    phone: String,
    saveInfo: Boolean,
    shippingRate: String,
    paymentMethod: String,
  },
  cartItems: [cartItemSchema], // Embedded array of cart items
  totalAmount: Number,
});

const Order = mongoose.model("Order", orderSchema);

app.post("/api/checkout", async (req, res) => {
  try {
    const { userData, cartItems, totalAmount, orderNumber } = req.body;

    // Ensure that cartItems are received properly
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "No cart items provided" });
    }

    // Ensure the order number is provided
    if (!orderNumber) {
      return res.status(400).json({ error: "Order number is required" });
    }

    // Update totalPrice for each cart item
    cartItems.forEach((item) => {
      item.totalPrice = item.price * item.quantity; // Calculate totalPrice for each item
    });

    // Create new order with updated cart items and order number
    const newOrder = new Order({
      orderNumber, // Include the order number
      userData,
      cartItems,
      totalAmount,
    });

    // Save the new order
    await newOrder.save();

    // After the order is saved, clear all cart items from the CartItem collection
    await CartItem.deleteMany({}); // This removes all items from the cart

    // Send a success response back with order details and a message
    res.status(201).json({
      message: "Order placed successfully, cart cleared!",
      orderNumber: newOrder.orderNumber, // Include the orderNumber in the response
      order: newOrder,
      redirect: true, // New flag to indicate that redirection is required
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to place the order" });
  }
});

//for saving contact us page data
// Schema and Model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timeSent: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// API Endpoint to handle messages
app.post("/api/messages", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message received successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
