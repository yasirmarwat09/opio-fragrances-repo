//js for menu buttons items
//js for menu buttons items
//js for menu buttons items
//js for menu buttons items
//js for menu buttons items
const menuButton = document.querySelector(".toggle-menu-btn");
const navPages = document.querySelector(".nav-pages");

// Toggle the menu
menuButton.addEventListener("click", (event) => {
  navPages.classList.toggle("open");
  event.stopPropagation(); // Prevent event bubbling
});

// Close the menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!navPages.contains(event.target) && !menuButton.contains(event.target)) {
    navPages.classList.remove("open");
  }
});

//js for search button
//js for search button
//js for search button
//js for search button
//js for search button
//js for search button
// Search Button Modal Logic
const searchButton = document.querySelector(".toggle-btn.search-button");
const searchOverlay = document.querySelector(".search-overlay");
const searchCloseButton = document.getElementById("search-close-btn");
const searchInput = document.getElementById("search-input");

// Open search modal on search button click
searchButton.addEventListener("click", () => {
  searchOverlay.style.display = "flex";
  searchInput.focus(); // Focus on the input when modal opens
});

// Close search modal on close button click
searchCloseButton.addEventListener("click", () => {
  searchOverlay.style.display = "none";
  searchInput.value = ""; // Clear input when closing
});

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

//js for login form
//js for login form
//js for login form
//js for login form
//js for login form
//js for login form
document.addEventListener("DOMContentLoaded", function () {
  const authOverlay = document.getElementById("auth-overlay");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const toRegister = document.getElementById("to-register");
  const backToLogin = document.getElementById("back-to-login");

  // Open the login modal
  document.querySelector(".login-btn").addEventListener("click", function () {
    authOverlay.classList.add("show");
  });

  // Close the modal
  authOverlay.addEventListener("click", function (e) {
    if (e.target === authOverlay) {
      authOverlay.classList.remove("show");
    }
  });

  // Switch to Register Form
  toRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Switch back to Login Form
  backToLogin.addEventListener("click", function () {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
});
// Get the close button and the auth overlay
const loginCloseBtn = document.getElementById("login-close-btn");
const authOverlay = document.getElementById("auth-overlay");

// Add an event listener to the close button
loginCloseBtn.addEventListener("click", () => {
  // Hide the auth overlay (login modal)
  authOverlay.classList.remove("show");
});

//js for hero section
//js for hero section
//js for hero section
//js for hero section
//js for hero section
//js for hero section
//js for hero section
// Elements for sliding and navigation
const navButtons = document.querySelectorAll(".nav-btn");
const slides = document.querySelector(".slides");
const heroImages = document.querySelectorAll(".hero-img");
const bottomHeroImg = document.querySelector(".bottom-hero-img img");

// State variables
let currentSlideIndex = 0;
let slideInterval;
let isDragging = false;
let startX = 0;

// Function to update images for responsiveness
function updateImagesForSmallScreens() {
  if (window.innerWidth < 800) {
    heroImages.forEach((img, index) => {
      img.src = `Assets/${index + 1}-hero-img-resized.jpg`;
    });
    if (bottomHeroImg) {
      bottomHeroImg.src = `Assets/mobile-size-bottom-hero-img.jpg`;
    }
  } else {
    heroImages.forEach((img, index) => {
      img.src = `Assets/${index + 1}-hero-img.jpg`;
    });
    if (bottomHeroImg) {
      bottomHeroImg.src = `Assets/bottom-hero-img.jpg`;
    }
  }
}

// Function to move slides and update buttons
function moveSlidesTo(index) {
  currentSlideIndex = index;
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateActiveButton(index);
}

// Function to update the active button
function updateActiveButton(index) {
  navButtons.forEach((btn) => btn.classList.remove("active"));
  navButtons[index].classList.add("active");
}

// Function to go to the next slide
function goToNextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % heroImages.length;
  moveSlidesTo(currentSlideIndex);
}

// Function to start the auto-slide loop
function startAutoSlide() {
  slideInterval = setInterval(goToNextSlide, 4000);
}

// Function to stop the auto-slide loop
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Navigation button click event
navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    stopAutoSlide(); // Stop auto-slide on user interaction
    moveSlidesTo(index);
    startAutoSlide(); // Restart auto-slide
  });
});

// Touch events for swipe functionality
slides.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoSlide(); // Stop auto-slide on user interaction
});

slides.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - startX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0 && currentSlideIndex < heroImages.length - 1) {
      moveSlidesTo(currentSlideIndex + 1); // Swipe left
    } else if (deltaX > 0 && currentSlideIndex > 0) {
      moveSlidesTo(currentSlideIndex - 1); // Swipe right
    }
    isDragging = false; // Prevent further swiping
  }
});

slides.addEventListener("touchend", () => {
  isDragging = false;
  startAutoSlide(); // Restart auto-slide after swipe
});

// Initial setup
window.addEventListener("resize", updateImagesForSmallScreens);
updateImagesForSmallScreens();
moveSlidesTo(0);
startAutoSlide();

// js for sliding of items
// js for sliding of items
// js for sliding of items
// js for sliding of items
// js for sliding of items
// js for sliding of items
// js for sliding of items
document.addEventListener("DOMContentLoaded", function () {
  const shopNowSection = document.querySelector(".shop-now-section");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const items = Array.from(document.querySelectorAll(".shop-now-section a"));
  const totalItems = items.length;
  let currentIndex = 0;

  const mediaQuery = window.matchMedia("(max-width: 1050px)"); // Change the width as needed for small screens
  let cloned = false; // Track whether items are cloned or not

  // Function to clone items for small screens
  function cloneItemsForSmallScreens() {
    if (mediaQuery.matches && !cloned) {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[totalItems - 1].cloneNode(true);

      // Append and prepend clones
      shopNowSection.appendChild(firstClone);
      shopNowSection.insertBefore(lastClone, items[0]);

      cloned = true; // Mark as cloned
    }
  }

  // Function to reset items when on larger screens
  function resetItemsForLargeScreens() {
    if (!mediaQuery.matches && cloned) {
      // Remove clones if they exist and reset carousel
      shopNowSection.removeChild(shopNowSection.lastChild); // Remove the last clone
      shopNowSection.removeChild(shopNowSection.firstChild); // Remove the first clone
      cloned = false; // Mark as not cloned

      // Reset the position to show the first actual item
      shopNowSection.style.transition = "none";
      shopNowSection.style.transform = "translateX(0)";
      setTimeout(() => {
        shopNowSection.style.transition = "transform 0.3s ease";
      }, 50);
    }
  }

  // Function to update the carousel
  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20; // Calculate item width with margin
    const offset = -currentIndex * itemWidth;
    shopNowSection.style.transition = "transform 0.3s ease";
    shopNowSection.style.transform = `translateX(${offset}px)`;
  }

  // Show the next set of items
  function showNextItem() {
    currentIndex++;
    updateCarousel();

    // When we reach the last item (which is a clone), reset the carousel position to avoid duplicates
    if (currentIndex === totalItems) {
      setTimeout(() => {
        shopNowSection.style.transition = "none";
        currentIndex = 1; // Set to first item (skip clone)
        shopNowSection.style.transform = `translateX(${-items[0]
          .offsetWidth}px)`;
        setTimeout(() => {
          shopNowSection.style.transition = "transform 0.3s ease";
        }, 50);
      }, 300);
    }
  }

  // Show the previous set of items
  function showPrevItem() {
    currentIndex--;
    updateCarousel();

    // When we reach the first item (which is a clone), reset the carousel position
    if (currentIndex === -1) {
      setTimeout(() => {
        shopNowSection.style.transition = "none";
        currentIndex = totalItems - 2; // Skip to last actual item
        shopNowSection.style.transform = `translateX(${
          -items[0].offsetWidth * currentIndex
        }px)`;
        setTimeout(() => {
          shopNowSection.style.transition = "transform 0.3s ease";
        }, 50);
      }, 300);
    }
  }

  // Event listeners for chevron buttons
  leftBtn.addEventListener("click", showPrevItem);
  rightBtn.addEventListener("click", showNextItem);

  // Automatically move to the next item every 3 seconds
  setInterval(() => {
    if (mediaQuery.matches) {
      showNextItem();
    }
  }, 3000);

  // Handle window resize to adjust behavior for small and large screens
  function handleResize() {
    cloneItemsForSmallScreens(); // Clone items for small screens
    resetItemsForLargeScreens(); // Remove clones and reset for large screens
  }

  // Add resize event listener
  window.addEventListener("resize", handleResize);

  // Call the clone function initially
  cloneItemsForSmallScreens();
  handleResize(); // Ensure it's set correctly on page load
});

//for loading header and footer onto other pages
//for loading header and footer onto other pages
//for loading header and footer onto other pages
//for loading header and footer onto other pages
//for loading header and footer onto other pages
