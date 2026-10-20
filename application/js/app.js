
"use strict";

// ========================================
// 1. Product data
// ========================================

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 45,
    emoji: "🎧",
    description: "Enjoy music with wireless freedom.",
    category: "Audio"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 65,
    emoji: "⌚",
    description: "Keep your everyday essentials close.",
    category: "Wearables"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 55,
    emoji: "👟",
    description: "Comfort for everyday adventures.",
    category: "Footwear"
  },
  {
    id: 4,
    name: "Backpack",
    price: 35,
    emoji: "🎒",
    description: "Carry your essentials in style.",
    category: "Bags"
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 25,
    emoji: "🕶️",
    description: "A simple accessory for sunny days.",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Camera",
    price: 120,
    emoji: "📷",
    description: "Capture your favourite moments.",
    category: "Electronics"
  }
];

// Cart stores product objects with their quantities.
const cart = new Map();

// ========================================
// 2. DOM elements
// ========================================

const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");

const productSearch = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const sortProducts = document.getElementById("sort-products");
const resetFilters = document.getElementById("reset-filters");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");

const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");

// ========================================
// 3. Utility functions
// ========================================

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

// Escape dynamic text before inserting it into HTML.
function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(/[&<>"']/g, character => {
    return characters[character];
  });
}

// ========================================
// 4. Search, filter, sort and render products
// ========================================

function renderProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedSort = sortProducts.value;

  // Search by product name or description.
  let filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    let matchesPrice = true;

    if (selectedPrice === "under-50") {
      matchesPrice = product.price < 50;
    } else if (selectedPrice === "50-100") {
      matchesPrice =
        product.price >= 50 && product.price <= 100;
    } else if (selectedPrice === "over-100") {
      matchesPrice = product.price > 100;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort the filtered results without changing the original data.
  if (selectedSort === "price-low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "name-a-z") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (selectedSort === "name-z-a") {
    filteredProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // Update the result count.
  productCount.textContent =
    filteredProducts.length === products.length
      ? `${products.length} products`
      : `${filteredProducts.length} of ${products.length} products`;

  // Show a useful message if no products match.
  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <p class="no-products">
        No products found. Try changing your search or filters.
      </p>
    `;
    return;
  }

  // Render product cards.
  productList.innerHTML = filteredProducts.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-art" aria-hidden="true">
        ${product.emoji}
      </div>

      <h3>${escapeHTML(product.name)}</h3>

      <span class="product-category">
        ${escapeHTML(product.category)}
      </span>

      <p>${escapeHTML(product.description)}</p>

      <div class="product-bottom">
        <span class="product-price">
          ${formatPrice(product.price)}
        </span>

        <button
          type="button"
          class="primary-btn"
          data-add="${product.id}"
          aria-label="Add ${escapeHTML(product.name)} to cart"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");
}

// ========================================
// 5. Product control events
// ========================================

productSearch.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
priceFilter.addEventListener("change", renderProducts);
sortProducts.addEventListener("change", renderProducts);

resetFilters.addEventListener("click", () => {
  productSearch.value = "";
  categoryFilter.value = "all";
  priceFilter.value = "all";
  sortProducts.value = "default";

  renderProducts();
});

// ========================================
// 6. Add products to cart
// ========================================

productList.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  const id = Number(button.dataset.add);
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existingItem = cart.get(id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.set(id, {
      ...product,
      quantity: 1
    });
  }

  renderCart();
});

// ========================================
// 7. Render cart and calculate totals
// ========================================

function renderCart() {
  const items = [...cart.values()];

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  checkoutButton.disabled = items.length === 0;

  checkoutButton.style.opacity =
    items.length === 0 ? "0.55" : "1";

  checkoutButton.style.cursor =
    items.length === 0 ? "not-allowed" : "pointer";

  if (items.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty. Add a product to get started.
      </p>
    `;
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-row" data-cart-item="${item.id}">
      <div>
        <strong>${escapeHTML(item.name)}</strong>
        <p>
          ${formatPrice(item.price)} each ·
          Subtotal: ${formatPrice(item.price * item.quantity)}
        </p>
      </div>

      <div class="cart-actions">
        <button
          type="button"
          class="quantity-btn"
          data-decrease="${item.id}"
          aria-label="Decrease ${escapeHTML(item.name)} quantity"
        >
          −
        </button>

        <span data-quantity="${item.id}">${item.quantity}</span>

        <button
          type="button"
          class="quantity-btn"
          data-increase="${item.id}"
          aria-label="Increase ${escapeHTML(item.name)} quantity"
        >
          +
        </button>

        <button
          type="button"
          class="remove-btn"
          data-remove="${item.id}"
          aria-label="Remove ${escapeHTML(item.name)}"
        >
          Remove
        </button>
      </div>
    </div>
  `).join("");
}

// ========================================
// 8. Increase, decrease and remove cart items
// ========================================

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");

  if (!button) return;

  const id = Number(
    button.dataset.increase ??
    button.dataset.decrease ??
    button.dataset.remove
  );

  if (!Number.isInteger(id)) return;

  const item = cart.get(id);

  if (!item) return;

  if (button.hasAttribute("data-increase")) {
    item.quantity += 1;
  } else if (button.hasAttribute("data-decrease")) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.delete(id);
    }
  } else if (button.hasAttribute("data-remove")) {
    cart.delete(id);
  }

  renderCart();
});

// ========================================
// 9. Open checkout
// ========================================

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) return;

  checkoutSection.hidden = false;
  orderMessage.textContent = "";

  checkoutSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// ========================================
// 10. Validate checkout and place order
// ========================================

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.size === 0) {
    orderMessage.textContent =
      "Please add a product before placing an order.";
    return;
  }

  // Browser validates required fields and email format.
  if (!checkoutForm.reportValidity()) return;

  const customerName = document
    .getElementById("customer-name")
    .value.trim();

  if (customerName.length < 2) {
    const nameInput = document.getElementById("customer-name");

    nameInput.setCustomValidity(
      "Please enter at least 2 characters for your name."
    );
    nameInput.reportValidity();
    nameInput.focus();
    nameInput.setCustomValidity("");
    return;
  }

  const orderTotal = [...cart.values()].reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderId = `ST-${Date.now().toString().slice(-6)}`;

  orderMessage.textContent =
    `Thank you, ${customerName}! Order ${orderId} placed successfully. Total: ${formatPrice(orderTotal)}.`;

  // Clear the cart after a successful demo order.
  cart.clear();
  renderCart();
  checkoutForm.reset();
});

// ========================================
// 11. Initialize application
// ========================================

renderProducts();
renderCart();
