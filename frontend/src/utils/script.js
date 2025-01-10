export function initializeHeroSection() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const slides = document.querySelector(".slides");

  if (slides && navButtons.length > 0) {
    let currentSlideIndex = 0;
    let slideInterval;
    let isDragging = false;
    let startX = 0;

    function moveSlidesTo(index) {
      currentSlideIndex = index;
      slides.style.transition = "transform 0.5s ease-in-out";
      slides.style.transform = `translateX(-${index * 100}%)`;
      updateActiveButton(index);
    }

    function updateActiveButton(index) {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      navButtons[index].classList.add("active");
    }

    function goToNextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % navButtons.length;
      moveSlidesTo(currentSlideIndex);
    }

    function startAutoSlide() {
      slideInterval = setInterval(goToNextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    navButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        stopAutoSlide();
        moveSlidesTo(index);
        startAutoSlide();
      });
    });

    slides.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    });

    slides.addEventListener("touchmove", (e) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0 && currentSlideIndex < navButtons.length - 1) {
          moveSlidesTo(currentSlideIndex + 1);
        } else if (deltaX > 0 && currentSlideIndex > 0) {
          moveSlidesTo(currentSlideIndex - 1);
        }
        isDragging = false;
      }
    });

    slides.addEventListener("touchend", () => {
      isDragging = false;
      startAutoSlide();
    });

    moveSlidesTo(0);
    startAutoSlide();
  }
}

export function initializeShopNowSection() {
  const shopNowSection = document.querySelector(".shop-now-section");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const items = Array.from(document.querySelectorAll(".shop-now-section a"));

  if (shopNowSection && leftBtn && rightBtn && items.length > 0) {
    const totalItems = items.length;
    let currentIndex = 0;
    const mediaQuery = window.matchMedia("(max-width: 1050px)");
    let cloned = false;

    function cloneItemsForSmallScreens() {
      if (mediaQuery.matches && !cloned) {
        const firstClone = items[0].cloneNode(true);
        const lastClone = items[totalItems - 1].cloneNode(true);

        shopNowSection.appendChild(firstClone);
        shopNowSection.insertBefore(lastClone, items[0]);
        cloned = true;
      }
    }

    function resetItemsForLargeScreens() {
      if (!mediaQuery.matches && cloned) {
        shopNowSection.removeChild(shopNowSection.lastChild);
        shopNowSection.removeChild(shopNowSection.firstChild);
        cloned = false;

        shopNowSection.style.transition = "none";
        shopNowSection.style.transform = "translateX(0)";
        setTimeout(() => {
          shopNowSection.style.transition = "transform 0.3s ease";
        }, 50);
      }
    }

    function updateCarousel() {
      const itemWidth = items[0].offsetWidth + 20;
      const offset = -currentIndex * itemWidth;
      shopNowSection.style.transition = "transform 0.3s ease";
      shopNowSection.style.transform = `translateX(${offset}px)`;
    }

    function showNextItem() {
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems) {
        setTimeout(() => {
          shopNowSection.style.transition = "none";
          currentIndex = 1;
          shopNowSection.style.transform = `translateX(${-items[0]
            .offsetWidth}px)`;
          setTimeout(() => {
            shopNowSection.style.transition = "transform 0.3s ease";
          }, 50);
        }, 300);
      }
    }

    function showPrevItem() {
      currentIndex--;
      updateCarousel();

      if (currentIndex === -1) {
        setTimeout(() => {
          shopNowSection.style.transition = "none";
          currentIndex = totalItems - 2;
          shopNowSection.style.transform = `translateX(${
            -items[0].offsetWidth * currentIndex
          }px)`;
          setTimeout(() => {
            shopNowSection.style.transition = "transform 0.3s ease";
          }, 50);
        }, 300);
      }
    }

    leftBtn.addEventListener("click", showPrevItem);
    rightBtn.addEventListener("click", showNextItem);

    setInterval(() => {
      if (mediaQuery.matches) {
        showNextItem();
      }
    }, 3000);

    function handleResize() {
      cloneItemsForSmallScreens();
      resetItemsForLargeScreens();
    }

    window.addEventListener("resize", handleResize);

    cloneItemsForSmallScreens();
    handleResize();
  }
}
// Function to add event listeners for the menu
export function addMenuEventListeners() {
  const menuButton = document.querySelector(".toggle-menu-btn");
  const navPages = document.querySelector(".nav-pages");

  if (menuButton && navPages) {
    // Remove any existing event listeners to avoid duplicates
    menuButton.replaceWith(menuButton.cloneNode(true));
    const newMenuButton = document.querySelector(".toggle-menu-btn");
    // Toggle the menu on button click
    newMenuButton.addEventListener("click", (event) => {
      navPages.classList.toggle("open");
      event.stopPropagation();
    });
    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
      if (
        !navPages.contains(event.target) &&
        !newMenuButton.contains(event.target)
      ) {
        navPages.classList.remove("open");
      }
    });
  }
}
// Function to add event listeners for the search button
export function addSearchEventListeners() {
  const searchButton = document.querySelector(".toggle-btn.search-button");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchCloseButton = document.getElementById("search-close-btn");
  const searchInput = document.getElementById("search-input");

  if (searchButton && searchOverlay && searchInput) {
    // Open search modal on search button click
    searchButton.addEventListener("click", () => {
      searchOverlay.style.display = "flex";
      searchInput.focus(); // Focus on the input when modal opens
    });

    // Close search modal on close button click
    if (searchCloseButton) {
      searchCloseButton.addEventListener("click", () => {
        searchOverlay.style.display = "none";
        searchInput.value = ""; // Clear input when closing
      });
    }

    // Close the modal if 'Enter' is pressed
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // Simulate form submission (no backend yet)
        alert(`Searching for: ${searchInput.value}`);
        searchOverlay.style.display = "none";
        searchInput.value = ""; // Clear input
      }
    });

    // Close the modal when clicking outside the search modal area
    window.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.style.display = "none";
      }
    });
  }
}
//js for login form
//js for login form
//js for login form
//js for login form
//js for login form
//js for login form
document.addEventListener("DOMContentLoaded", function () {
  // Initialize event listeners when DOM is fully loaded
  addAuthEventListeners();
  addCartEventListeners();

  // Set up ResizeObserver to monitor window size changes
  const resizeObserver = new ResizeObserver(() => {
    addAuthEventListeners();
    addCartEventListeners();
  });

  // Observe the document body for size changes
  resizeObserver.observe(document.body);
});

// Function to handle authentication-related event listeners
export function addAuthEventListeners() {
  const authOverlay = document.getElementById("auth-overlay");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const toRegister = document.getElementById("to-register");
  const backToLogin = document.getElementById("back-to-login");
  const loginCloseBtn = document.getElementById("login-close-btn");
  const loginButton = document.querySelector(".login-btn");

  if (authOverlay && loginButton) {
    // Open login modal when login button is clicked
    loginButton.addEventListener("click", function () {
      authOverlay.classList.add("show");
    });

    // Close modal if clicking outside of it
    authOverlay.addEventListener("click", function (e) {
      if (e.target === authOverlay) {
        authOverlay.classList.remove("show");
      }
    });
  }

  if (toRegister && registerForm && loginForm) {
    // Switch to Register Form
    toRegister.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    });
  }

  if (backToLogin && registerForm && loginForm) {
    // Switch back to Login Form
    backToLogin.addEventListener("click", function () {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    });
  }

  if (loginCloseBtn && authOverlay) {
    // Close modal when close button is clicked
    loginCloseBtn.addEventListener("click", function () {
      authOverlay.classList.remove("show");
    });
  }
}

// Function to handle cart-related event listeners
export function addCartEventListeners() {
  const cartIcon = document.querySelector(".cart-container");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCart = document.getElementById("close-cart");

  if (cartIcon && cartOverlay && closeCart) {
    // Show cart overlay when cart icon is clicked
    cartIcon.addEventListener("click", function () {
      cartOverlay.classList.add("active");
    });

    // Close cart overlay when close button is clicked
    closeCart.addEventListener("click", function () {
      cartOverlay.classList.remove("active");
    });

    // Close cart overlay if clicking outside the cart
    document.addEventListener("click", function (e) {
      if (!cartOverlay.contains(e.target) && !cartIcon.contains(e.target)) {
        cartOverlay.classList.remove("active");
      }
    });
  }
}

export function checkScreenSizeAndApply(callback) {
  // Initial check when the function is called
  const applyCallbackIfSmallScreen = () => {
    if (window.innerWidth <= 1050 && typeof callback === "function") {
      callback();
    }
  };

  // Apply on the initial load
  applyCallbackIfSmallScreen();

  // Add event listener to keep checking on resize
  window.addEventListener("resize", applyCallbackIfSmallScreen);
}

// Run the script on page load and on resize
document.addEventListener("DOMContentLoaded", () => {
  // Array of functions to be executed on screen size check
  const functionsToApply = [
    addMenuEventListeners,
    addSearchEventListeners,
    addAuthEventListeners,
    addCartEventListeners,
  ];

  // Run the initial checks for each function
  functionsToApply.forEach((func) => checkScreenSizeAndApply(func));

  // Set up a ResizeObserver to monitor window size changes
  const resizeObserver = new ResizeObserver(() => {
    functionsToApply.forEach((func) => checkScreenSizeAndApply(func));
  });

  // Observe the document body for size changes
  resizeObserver.observe(document.body);
});

// getting data from database
// getting data from database
// getting data from database
// Function to fetch product data by name
// Function to fetch product data from the backend
export function fetchProductData(productName) {
  fetch(`http://localhost:3000/product/${encodeURIComponent(productName)}`)
    .then((response) => response.json())
    .then((product) => {
      if (product) {
        checkAndUpdateElement("product-title", product.name);
        checkAndUpdateElement("product-price", `Rs:${product.price}/-`);
        checkAndUpdateElement("product-description", product.introduction);
        checkAndUpdateElement("description-paragraph", product.description);

        checkAndUpdateElement(
          "top-notes",
          `<strong class="note-heading">TOP NOTES:</strong> ${product.topNotes.join(
            ", "
          )}`
        );
        checkAndUpdateElement(
          "middle-notes",
          `<strong class="note-heading">MIDDLE NOTES:</strong> ${product.middleNotes.join(
            ", "
          )}`
        );
        checkAndUpdateElement(
          "base-notes",
          `<strong class="note-heading">BASE NOTES:</strong> ${product.baseNotes.join(
            ", "
          )}`
        );

        checkAndUpdateElement("featured-image", product.image, "src");
      }
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      // Handle error here, e.g., show a fallback UI
    });
}

// Function to check and update DOM elements
function checkAndUpdateElement(elementId, value, attribute = "textContent") {
  const intervalId = setInterval(() => {
    const element = document.getElementById(elementId);

    if (element) {
      // Update the element's content or attribute
      if (attribute === "src") {
        element.src = value;
      } else {
        element[attribute] = value;
      }

      // Stop checking once the element is updated
      clearInterval(intervalId);
    }
  }, 100); // Keep checking every 100ms
}
//adding items to cart
//adding items to cart
//adding items to cart
//adding items to cart
//adding items to cart
// Function to update the cart UI
export function updateCart(cartItems) {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalAmountElement = document.getElementById("total-amount");
  const checkoutButton = document.getElementById("checkout");
  let totalAmount = 0;

  // Clear current cart items
  cartItemsContainer.innerHTML = "";

  // Check if cartItems is an array and has data
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    cartItems.forEach((item) => {
      // Check if the item has all necessary properties
      if (!item.name || !item.price || !item.image || !item._id) {
        console.warn("Invalid item data:", item);
        return;
      }

      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
        <div class="cart-left">
          <img src="${item.image}" alt="Product Image" class="cart-item-img" />
          <span class="cart-item-name">${item.name}</span>
        </div>
        <span class="cart-item-price">Rs. ${item.price}</span>
        <div class="cart-item-actions">
          <button class="delete-cart-item" data-id="${item._id}">
            <i class="fa fa-trash"></i>
          </button>
          <input 
            type="number" 
            class="cart-item-quantity" 
            value="${item.quantity}" 
            min="1"
            data-id="${item._id}" 
          />
        </div>
      `;
      cartItemsContainer.appendChild(cartItemDiv);
      totalAmount += item.price * item.quantity; // Multiply by quantity for correct total
    });

    // Only enable checkout button if it exists
    if (checkoutButton) {
      checkoutButton.disabled = false; // Enable the checkout button
    }
  } else {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";

    // Disable checkout button when the cart is empty, only if the button exists
    if (checkoutButton) {
      checkoutButton.disabled = true; // Disable the checkout button
    }
  }
  // Update the total amount
  totalAmountElement.innerText = `Rs. ${totalAmount}`;

  // Function to safely update the cart
  function updateCartDisplay(cartItems) {
    // Ensure cartItems is a valid array before accessing it
    if (Array.isArray(cartItems)) {
      const cartCounter = document.querySelector(".cart-counter");
      const cartCount = document.querySelector(".cart-count");

      // Update cart counter
      if (cartCounter) {
        cartCounter.innerText = cartItems.length; // Update counter to number of items
      }

      // Update cart item count text
      if (cartCount) {
        cartCount.innerText = `(${cartItems.length} item${
          cartItems.length === 1 ? "" : "s"
        })`; // Update item count text
      }
    } else {
      // If cartItems is not valid, do nothing (no console output or error)
      return;
    }
  }

  // Periodically check for cartItems (e.g., every 500ms)
  setInterval(() => {
    const cartItems = window.cartItems || []; // Assuming cartItems is globally available
    updateCartDisplay(cartItems);
  }, 500);

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-cart-item");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = e.target.closest("button").getAttribute("data-id");
      try {
        // Send request to remove item from the cart
        const response = await fetch(`/remove-from-cart/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedCart = await response.json();
          if (updatedCart.products && Array.isArray(updatedCart.products)) {
            updateCart(updatedCart.products); // Update the cart UI with the latest products
          } else if (Array.isArray(updatedCart)) {
            updateCart(updatedCart); // Handle response as an array
          } else {
            console.error(
              "Invalid response structure for cart data:",
              updatedCart
            );
            updateCart([]); // Handle invalid response by clearing the cart
          }
        } else {
          alert("Failed to remove item from cart.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    });
  });

  // Add event listeners to quantity inputs
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", async (e) => {
      const productId = e.target.getAttribute("data-id");
      const newQuantity = parseInt(e.target.value, 10);

      if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Invalid quantity.");
        return;
      }

      try {
        // Send request to update item quantity
        const response = await fetch(`/update-cart/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          if (updatedCart.products && Array.isArray(updatedCart.products)) {
            updateCart(updatedCart.products); // Update the cart UI with the latest products
          } else if (Array.isArray(updatedCart)) {
            updateCart(updatedCart); // Handle response as an array
          } else {
            console.error(
              "Invalid response structure for cart data:",
              updatedCart
            );
            updateCart([]); // Handle invalid response by clearing the cart
          }
        } else {
          alert("Failed to update quantity.");
        }
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    });
  });
}

// Fetch the current cart data when the page loads
async function loadCart() {
  try {
    const response = await fetch("/cart");
    if (!response.ok) {
      throw new Error("Failed to load cart data.");
    }

    const cart = await response.json();

    // Check if cart is an array or an object with products
    if (Array.isArray(cart)) {
      updateCart(cart); // If cart is already an array, update directly
    } else if (Array.isArray(cart.products)) {
      updateCart(cart.products); // If cart contains a 'products' key, use that
    } else {
      console.error("Invalid cart data structure", cart);
      updateCart([]); // If the structure is invalid, pass an empty array
    }
  } catch (error) {
    console.error("Error loading cart:", error);
    updateCart([]); // In case of error, clear the cart UI
  }
}

// Function to display the order popup
export function showOrderPopup() {
  const orderPopup = document.createElement("div");
  orderPopup.classList.add("order-popup");
  orderPopup.innerHTML = `
    <h2>Product Added to Cart!</h2>
    <p>Your item has been successfully added to cart.</p>
  `;
  document.body.appendChild(orderPopup);

  // Show the popup
  orderPopup.style.display = "block";

  // Automatically close the popup after 2 seconds
  setTimeout(() => {
    orderPopup.style.display = "none";
  }, 1700);
}

// Check if the "Add to Cart" button exists and then add event listener
const addToCartButton = document.querySelector(".add-to-cart-button");

if (addToCartButton) {
  addToCartButton.addEventListener("click", async () => {
    const productName = document.querySelector(".product-title")?.innerText;
    const productPriceElement = document.querySelector(".product-price");
    const productImage = document.querySelector(".featured-image")?.src;

    // Ensure all required details are available
    if (!productName || !productPriceElement || !productImage) {
      alert("Product details are missing!");
      return;
    }

    // Extract and clean the product price (remove non-numeric characters)
    const rawPrice = productPriceElement.innerText.replace(/[^0-9.-]+/g, ""); // Clean price
    const productPrice = parseFloat(rawPrice);

    // Validate price
    if (isNaN(productPrice)) {
      alert("Invalid price format.");
      return;
    }

    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    try {
      // Send product to the backend to add to the cart
      const response = await fetch("/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        alert("Failed to add product to cart.");
        return;
      }
      // Show the order popup
      showOrderPopup();
      // Reload the cart to ensure the updated data is fetched
      await loadCart(); // This ensures the cart is refreshed after adding a product
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  });
}

// Check if the "Close Cart" button exists and add the event listener
const closeCartButton = document.getElementById("close-cart");

if (closeCartButton) {
  closeCartButton.addEventListener("click", () => {
    document.getElementById("cart-overlay").style.display = "none";
  });
}

// Load the cart data on page load
document.addEventListener("DOMContentLoaded", loadCart);

//to load checkout page
//to load checkout page
//to load checkout page
//to load checkout page
//to load checkout page
//to load checkout page
export function assignCheckoutFunctionality() {
  const checkoutButton = document.getElementById("checkout");
  const homeButton = document.querySelector(".cart-home-btn");

  let isButtonFound = false;

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      window.location.href = "/checkout";
    });
    isButtonFound = true; // Button functionality assigned
  }

  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
    isButtonFound = true; // Button functionality assigned
  }

  return isButtonFound; // Return true if any button was found
}

export function pollForButtons() {
  const intervalId = setInterval(() => {
    const isButtonFound = assignCheckoutFunctionality();

    if (isButtonFound) {
      clearInterval(intervalId); // Stop polling when buttons are found
    }
  }, 1000); // Check every second
}

document.addEventListener("DOMContentLoaded", () => {
  pollForButtons();
});

//fetching data from cart collection and displaying it in checkout page

//fetching data from cart collection and displaying it in checkout page

//fetching data from cart collection and displaying it in checkout page

document.addEventListener("DOMContentLoaded", async function () {
  const checkElementsExist = () => {
    const subtotalElement = document.getElementById("subtotal-amount");
    const shippingElement = document.getElementById("shipping-amount");
    const totalElement = document.getElementById("total-amount-calculated");

    // Check if all necessary elements exist before proceeding
    return subtotalElement && shippingElement && totalElement;
  };

  // Wait for the elements to be available
  const waitForElements = () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (checkElementsExist()) {
          clearInterval(interval); // Stop checking once elements are found
          resolve();
        }
      }, 100); // Check every 100ms
    });
  };

  try {
    await waitForElements(); // Wait until the elements are available

    const response = await fetch("/checkout-data");

    if (!response.ok) {
      throw new Error("Failed to fetch checkout data");
    }

    const data = await response.json();

    const subtotalElement = document.getElementById("subtotal-amount");
    const shippingElement = document.getElementById("shipping-amount");
    const totalElement = document.getElementById("total-amount-calculated");

    if (subtotalElement && shippingElement && totalElement) {
      subtotalElement.textContent = `Rs. ${data.subtotal.toFixed(2)}`;
      shippingElement.textContent = `Rs. ${data.shippingCharges.toFixed(2)}`;
      const totalAmount = data.subtotal + data.shippingCharges;
      totalElement.textContent = `Rs. ${totalAmount.toFixed(2)}`;
    } else {
      console.error("DOM elements not found for update");
    }
  } catch (error) {
    console.error("Error updating checkout data:", error);
  }
});

//confirming orders
//confirming orders
//confirming orders
//confirming orders
document.addEventListener("DOMContentLoaded", async function () {
  const completeOrderBtn = document.querySelector(".complete-order-btn");

  if (completeOrderBtn) {
    completeOrderBtn.addEventListener("click", async () => {
      if (!isFormValid()) {
        alert("Please fill in all required fields.");
        return;
      }

      const orderNumber = generateOrderNumber();

      const userData = {
        email: document.getElementById("email1").value,
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        phone: document.getElementById("phone").value,
      };

      const cartItems = Array.from(document.querySelectorAll(".cart-item")).map(
        (item) => ({
          name: item.querySelector(".cart-item-name")?.textContent.trim(),
          price: parseFloat(
            item
              .querySelector(".cart-item-price")
              ?.textContent.replace("Rs.", "")
          ),
          quantity: parseInt(item.querySelector(".cart-item-quantity")?.value),
          totalPrice: parseFloat(
            item
              .querySelector(".cart-item-total-price")
              ?.textContent.replace("Rs.", "")
          ),
        })
      );

      if (cartItems.length === 0) {
        console.error("No cart items found.");
        return;
      }

      const totalAmount = parseFloat(
        document.getElementById("total-amount").textContent.replace("Rs.", "")
      );

      const finalTotalAmount = totalAmount + 199;

      const orderData = {
        userData,
        cartItems,
        totalAmount: finalTotalAmount,
        orderNumber,
      };

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          showOrderPopup(orderNumber);
        } else {
          throw new Error("Failed to place the order");
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
      }
    });
  }

  function generateOrderNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function isFormValid() {
    const email = document.getElementById("email1").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;

    return email && firstName && lastName && address && city && phone;
  }

  function showOrderPopup(orderNumber) {
    const popup = document.createElement("div");
    popup.className = "order-popup"; // Apply the class from your external CSS

    popup.innerHTML = `
      <h2>Order Placed Successfully!</h2>
      <p>Your order number is:</p>
      <p class="order-number">${orderNumber}</p>
      <button class="order-popup-close">OK</button>
    `;

    document.body.appendChild(popup);

    const closeButton = popup.querySelector(".order-popup-close");
    closeButton.addEventListener("click", () => {
      popup.remove(); // Close the popup when the "OK" button is clicked
      window.location.href = "/"; // Redirect to the homepage (index page)
    });
  }
});

//contact us page data fetching
//contact us page data fetching
//contact us page data fetching
export function assignContactFormFunctionality() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("contact-page-email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showPopup("Error", "All fields are required.");
        return;
      }

      // Show sending popup
      const sendingPopup = showPopup(
        "Info",
        "Sending your message, please wait..."
      );

      try {
        const response = await fetch("http://localhost:3000/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        // Remove sending popup
        sendingPopup.remove();

        const result = await response.json();
        if (response.ok) {
          showPopup(
            "Success",
            "Thank you for contacting us! Your message has been sent."
          );
          contactForm.reset();
        } else {
          showPopup(
            "Error",
            result.message || "Failed to send the message. Please try again."
          );
        }
      } catch (error) {
        sendingPopup.remove();
        showPopup("Error", "An error occurred. Please try again later.");
      }
    });
    return true;
  }
  return false;
}

export function pollForContactForm() {
  const intervalId = setInterval(() => {
    const isFormAvailable = assignContactFormFunctionality();
    if (isFormAvailable) clearInterval(intervalId);
  }, 2500);
}

// Updated showPopup function with auto-disappearance
function showPopup(title, message) {
  const popup = document.createElement("div");
  popup.className = "order-popup"; // Using the .order-popup class for styling

  popup.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
  `;
  document.body.appendChild(popup);

  // Remove popup after 2 seconds
  setTimeout(() => {
    popup.remove();
  }, 2000);

  return popup;
}

pollForContactForm();
