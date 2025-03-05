// Product data
const products = [
  {
    id: 1,
    name: "Premium Adjustable Dumbbell Set",
    price: 299.99,
    category: "weights",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    description:
      "Adjustable from 5 to 52.5 pounds, this premium dumbbell set is perfect for home gyms. The innovative dial system allows for quick weight adjustments.",
    features: [
      "Adjustable from 5 to 52.5 pounds",
      "Space-saving design",
      "Durable construction",
      "Easy weight selection with dial system",
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Pro Treadmill T7",
    price: 1299.99,
    category: "cardio",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    description:
      "Take your cardio workouts to the next level with our Pro Treadmill T7. Features a powerful motor, incline options, and a large running surface.",
    features: [
      "3.5 HP motor",
      "0-15% incline",
      '20" x 60" running surface',
      "Built-in workout programs",
      "Heart rate monitoring",
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Yoga Mat",
    price: 49.99,
    category: "yoga",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    description:
      "Our premium yoga mat provides the perfect balance of cushioning and stability for your practice. Made with eco-friendly materials.",
    features: [
      "6mm thickness",
      "Non-slip surface",
      "Eco-friendly materials",
      "Includes carrying strap",
      "Easy to clean",
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "Resistance Bands Set",
    price: 29.99,
    category: "accessories",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    description:
      "This set of 5 resistance bands is perfect for strength training, physical therapy, or adding intensity to your workouts.",
    features: [
      "5 different resistance levels",
      "Made from durable latex",
      "Includes carrying case",
      "Suitable for all fitness levels",
      "Exercise guide included",
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "Olympic Barbell",
    price: 199.99,
    category: "weights",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    description:
      "Professional-grade Olympic barbell with a 1,500 lb weight capacity. Perfect for serious lifters and home gym enthusiasts.",
    features: [
      "20kg (44lbs) weight",
      "1,500 lb capacity",
      "28mm grip diameter",
      "Knurled grip for better handling",
      "Chrome finish",
    ],
    inStock: true,
  },
  {
    id: 6,
    name: "Indoor Cycling Bike",
    price: 799.99,
    category: "cardio",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    description:
      "Bring the spin class experience to your home with our Indoor Cycling Bike. Features a heavy flywheel, adjustable resistance, and comfortable seating.",
    features: [
      "40 lb flywheel",
      "Infinite resistance levels",
      "Adjustable seat and handlebars",
      "LCD display",
      "Water bottle holder",
    ],
    inStock: true,
  },
  {
    id: 7,
    name: "Foam Roller",
    price: 34.99,
    category: "accessories",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    description:
      "Relieve muscle tension and improve recovery with our high-density foam roller. Perfect for self-myofascial release and massage.",
    features: [
      "High-density EVA foam",
      "Textured surface",
      "Lightweight and portable",
      "Durable construction",
      "Suitable for all body parts",
    ],
    inStock: true,
  },
  {
    id: 8,
    name: "Kettlebell Set",
    price: 149.99,
    category: "weights",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    description:
      "This set of 3 kettlebells (10, 15, and 20 lbs) is perfect for functional training and building strength and power.",
    features: [
      "Cast iron construction",
      "Vinyl coating for floor protection",
      "Comfortable grip",
      "Flat bottom for storage",
      "Color-coded by weight",
    ],
    inStock: true,
  },
]

// DOM Elements
const cartIcon = document.getElementById("cart-icon")
const cartSidebar = document.querySelector(".cart-sidebar")
const closeCart = document.querySelector(".close-cart")
const overlay = document.querySelector(".overlay")
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const cartItemsContainer = document.querySelector(".cart-items")
const cartCount = document.querySelector(".cart-count")
const cartTotalPrice = document.getElementById("cart-total-price")
const featuredProductsContainer = document.getElementById("featured-products")
const productsGrid = document.getElementById("products-grid")
const productDetailContainer = document.getElementById("product-detail-container")
const relatedProductsContainer = document.getElementById("related-products")
const newsletterForm = document.getElementById("newsletter-form")
const contactForm = document.getElementById("contact-form")

// Cart functionality
let cart = []

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("active")
  overlay.classList.toggle("active")
}

// Close cart when clicking outside
function closeCartOnClickOutside() {
  cartSidebar.classList.remove("active")
  overlay.classList.remove("active")
}

// Toggle mobile menu
function toggleMobileMenu() {
  navLinks.classList.toggle("active")
  overlay.classList.toggle("active")
}

// Add event listeners
if (cartIcon) cartIcon.addEventListener("click", toggleCart)
if (closeCart) closeCart.addEventListener("click", toggleCart)
if (overlay) overlay.addEventListener("click", closeCartOnClickOutside)
if (hamburger) hamburger.addEventListener("click", toggleMobileMenu)

// Add to cart function
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId)

  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  updateCart()
  toggleCart()
}

// Remove from cart function
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCart()
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId)

  if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCart()
    }
  }
}

// Update cart UI
function updateCart() {
  if (!cartItemsContainer) return

  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
    cartCount.textContent = "0"
    cartTotalPrice.textContent = "$0.00"
    return
  }

  let total = 0
  let itemCount = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal
    itemCount += item.quantity

    const cartItemElement = document.createElement("div")
    cartItemElement.classList.add("cart-item")
    cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `

    cartItemsContainer.appendChild(cartItemElement)
  })

  cartCount.textContent = itemCount.toString()
  cartTotalPrice.textContent = `$${total.toFixed(2)}`

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCart()
  }
}

// Display featured products on homepage
function displayFeaturedProducts() {
  if (!featuredProductsContainer) return

  // Get 4 random products for featured section
  const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4)

  featuredProducts.forEach((product) => {
    const productElement = createProductElement(product)
    featuredProductsContainer.appendChild(productElement)
  })
}

// Create product element
function createProductElement(product) {
  const productElement = document.createElement("div")
  productElement.classList.add("product-card")

  productElement.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-title">
                <a href="product-detail.html?id=${product.id}">${product.name}</a>
            </h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span>${product.rating}</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="wishlist-btn">♡</button>
            </div>
        </div>
    `

  return productElement
}

// Display all products on products page
function displayProducts(filteredProducts = products) {
  if (!productsGrid) return

  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>'
    return
  }

  filteredProducts.forEach((product) => {
    const productElement = createProductElement(product)
    productsGrid.appendChild(productElement)
  })
}

// Filter products by category
function filterProductsByCategory(category) {
  if (category === "all") {
    return products
  }
  return products.filter((product) => product.category === category)
}

// Filter products by price
function filterProductsByPrice(maxPrice) {
  return products.filter((product) => product.price <= maxPrice)
}

// Sort products
function sortProducts(products, sortBy) {
  const sortedProducts = [...products]

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      sortedProducts.sort((a, b) => b.price - a.price)
      break
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      // Default sorting (featured)
      break
  }

  return sortedProducts
}

// Display product details on product detail page
function displayProductDetails() {
  if (!productDetailContainer) return

  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))

  if (!productId) {
    window.location.href = "products.html"
    return
  }

  const product = products.find((p) => p.id === productId)

  if (!product) {
    window.location.href = "products.html"
    return
  }

  // Update breadcrumb
  const productBreadcrumb = document.getElementById("product-breadcrumb")
  if (productBreadcrumb) {
    productBreadcrumb.textContent = product.name
  }

  // Create product detail HTML
  productDetailContainer.innerHTML = `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="thumbnail-images">
                <div class="thumbnail active">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="thumbnail">
                    <img src="/placeholder.svg?height=80&width=80" alt="${product.name}">
                </div>
                <div class="thumbnail">
                    <img src="/placeholder.svg?height=80&width=80" alt="${product.name}">
                </div>
                <div class="thumbnail">
                    <img src="/placeholder.svg?height=80&width=80" alt="${product.name}">
                </div>
            </div>
        </div>
        <div class="product-details">
            <h1 class="product-title-large">${product.name}</h1>
            <p class="product-price-large">$${product.price.toFixed(2)}</p>
            <div class="product-rating-large">
                <span class="stars">★★★★★</span>
                <span>${product.rating} (${Math.floor(product.rating * 10)} reviews)</span>
            </div>
            <div class="product-description">
                <p>${product.description}</p>
            </div>
            <div class="product-meta">
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Availability:</span>
                    <span>${product.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
            </div>
            <div class="product-actions-large">
                <div class="quantity-control">
                    <button class="quantity-btn-large" onclick="decrementQuantity()">-</button>
                    <input type="number" id="product-quantity" class="quantity-input-large" value="1" min="1">
                    <button class="quantity-btn-large" onclick="incrementQuantity()">+</button>
                </div>
                <button class="add-to-cart add-to-cart-large" onclick="addToCartFromDetail(${product.id})">Add to Cart</button>
            </div>
            <div class="product-tabs">
                <div class="tabs-header">
                    <button class="tab-btn active" data-tab="description">Description</button>
                    <button class="tab-btn" data-tab="features">Features</button>
                    <button class="tab-btn" data-tab="reviews">Reviews</button>
                </div>
                <div class="tab-content active" id="description-tab">
                    <p>${product.description}</p>
                </div>
                <div class="tab-content" id="features-tab">
                    <ul>
                        ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                <div class="tab-content" id="reviews-tab">
                    <p>Customer reviews coming soon.</p>
                </div>
            </div>
        </div>
    `

  // Add event listeners for tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab")

      // Remove active class from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"))

      // Add active class to selected tab
      btn.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Add event listeners for thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail")
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked thumbnail
      thumbnail.classList.add("active")

      // Update main image
      const mainImage = document.querySelector(".main-image img")
      mainImage.src = thumbnail.querySelector("img").src
    })
  })

  // Display related products
  displayRelatedProducts(product.category, product.id)
}

// Display related products
function displayRelatedProducts(category, currentProductId) {
  if (!relatedProductsContainer) return

  const relatedProducts = products.filter((p) => p.category === category && p.id !== currentProductId).slice(0, 4)

  relatedProducts.forEach((product) => {
    const productElement = createProductElement(product)
    relatedProductsContainer.appendChild(productElement)
  })
}

// Increment quantity on product detail page
function incrementQuantity() {
  const quantityInput = document.getElementById("product-quantity")
  if (quantityInput) {
    quantityInput.value = Number.parseInt(quantityInput.value) + 1
  }
}

// Decrement quantity on product detail page
function decrementQuantity() {
  const quantityInput = document.getElementById("product-quantity")
  if (quantityInput && Number.parseInt(quantityInput.value) > 1) {
    quantityInput.value = Number.parseInt(quantityInput.value) - 1
  }
}

// Add to cart from product detail page
function addToCartFromDetail(productId) {
  const quantityInput = document.getElementById("product-quantity")
  const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1
  addToCart(productId, quantity)
}

// Handle category filter clicks
function setupCategoryFilters() {
  const categoryFilters = document.querySelectorAll(".category-filters a")
  if (!categoryFilters.length) return

  categoryFilters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all filters
      categoryFilters.forEach((f) => f.classList.remove("active"))

      // Add active class to clicked filter
      filter.classList.add("active")

      const category = filter.getAttribute("data-category")
      const filteredProducts = filterProductsByCategory(category)
      displayProducts(filteredProducts)
    })
  })
}

// Handle price range filter
function setupPriceFilter() {
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")

  if (!priceRange || !priceValue) return

  priceRange.addEventListener("input", () => {
    const maxPrice = Number.parseInt(priceRange.value)
    priceValue.textContent = `$${maxPrice}`

    // Get active category
    const activeCategory = document.querySelector(".category-filters a.active")
    const category = activeCategory ? activeCategory.getAttribute("data-category") : "all"

    // Filter by category and price
    let filteredProducts = filterProductsByCategory(category)
    filteredProducts = filterProductsByPrice(maxPrice)

    // Get sort option
    const sortSelect = document.getElementById("sort-by")
    const sortBy = sortSelect ? sortSelect.value : "default"

    // Sort products
    filteredProducts = sortProducts(filteredProducts, sortBy)

    displayProducts(filteredProducts)
  })
}

// Handle sort by change
function setupSortBy() {
  const sortSelect = document.getElementById("sort-by")
  if (!sortSelect) return

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value

    // Get active category
    const activeCategory = document.querySelector(".category-filters a.active")
    const category = activeCategory ? activeCategory.getAttribute("data-category") : "all"

    // Get price range
    const priceRange = document.getElementById("price-range")
    const maxPrice = priceRange ? Number.parseInt(priceRange.value) : 1000

    // Filter by category and price
    let filteredProducts = filterProductsByCategory(category)
    filteredProducts = filterProductsByPrice(maxPrice)

    // Sort products
    filteredProducts = sortProducts(filteredProducts, sortBy)

    displayProducts(filteredProducts)
  })
}

// Handle newsletter form submission
function setupNewsletterForm() {
  if (!newsletterForm) return

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailInput = newsletterForm.querySelector('input[type="email"]')

    if (emailInput && emailInput.value) {
      alert(`Thank you for subscribing with ${emailInput.value}!`)
      emailInput.value = ""
    }
  })
}

// Handle contact form submission
function setupContactForm() {
  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = contactForm.querySelector("#name")
    const emailInput = contactForm.querySelector("#email")

    if (nameInput && emailInput) {
      alert(`Thank you for your message, ${nameInput.value}! We will get back to you at ${emailInput.value} soon.`)
      contactForm.reset()
    }
  })
}

// Testimonial slider
function setupTestimonialSlider() {
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const testimonials = document.querySelectorAll(".testimonial")

  if (!prevBtn || !nextBtn || !testimonials.length) return

  let currentSlide = 0

  // Hide all testimonials except the first one
  testimonials.forEach((testimonial, index) => {
    if (index !== 0) {
      testimonial.style.display = "none"
    }
  })

  // Show next testimonial
  nextBtn.addEventListener("click", () => {
    testimonials[currentSlide].style.display = "none"
    currentSlide = (currentSlide + 1) % testimonials.length
    testimonials[currentSlide].style.display = "block"
  })

  // Show previous testimonial
  prevBtn.addEventListener("click", () => {
    testimonials[currentSlide].style.display = "none"
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length
    testimonials[currentSlide].style.display = "block"
  })
}

// Initialize the page
function initPage() {
  loadCart()
  displayFeaturedProducts()
  displayProducts()
  displayProductDetails()
  setupCategoryFilters()
  setupPriceFilter()
  setupSortBy()
  setupNewsletterForm()
  setupContactForm()
  setupTestimonialSlider()
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage)

