
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 45,
    emoji: "🎧",
    description: "Enjoy music with wireless freedom."
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 65,
    emoji: "⌚",
    description: "Keep your everyday essentials close."
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 55,
    emoji: "👟",
    description: "Comfort for everyday adventures."
  },
  {
    id: 4,
    name: "Backpack",
    price: 35,
    emoji: "🎒",
    description: "Carry your essentials in style."
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 25,
    emoji: "🕶️",
    description: "A simple accessory for sunny days."
  },
  {
    id: 6,
    name: "Camera",
    price: 120,
    emoji: "📷",
    description: "Capture your favourite moments."
  }
];

const cart = new Map();

const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

// Display all products
function renderProducts() {
  productCount.textContent = `${products.length} products`;

  productList.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">
        ${product.emoji}
      </div>

      <h3>${product.name}</h3>
      <p>${product.description}</p>

      <div class="product-bottom">
        <span class="product-price">
          ${formatPrice(product.price)}
        </span>

        <button
          type="button"
          class="primary-btn"
          data-add="${product.id}"
          aria-label="Add ${product.name} to cart"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");
}

// Display cart and calculate totals
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
  checkoutButton.style.opacity = items.length === 0 ? "0.55" : "1";
  checkoutButton.style.cursor = items.length === 0
    ? "not-allowed"
    : "pointer";

  if (items.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty. Add a product to get started.
      </p>
    `;
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-row">
      <div>
        <strong>${item.name}</strong>
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
          aria-label="Decrease ${item.name} quantity"
        >
          −
        </button>

        <span data-quantity="${item.id}">${item.quantity}</span>

        <button
          type="button"
          class="quantity-btn"
          data-increase="${item.id}"
          aria-label="Increase ${item.name} quantity"
        >
          +
        </button>

        <button
          type="button"
          class="remove-btn"
          data-remove="${item.id}"
          aria-label="Remove ${item.name}"
        >
          Remove
        </button>
      </div>
    </div>
  `).join("");
}

// Add products to cart
productList.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  const id = Number(button.dataset.add);
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existing = cart.get(id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(id, {
      ...product,
      quantity: 1
    });
  }

  renderCart();
});

// Increase quantity, decrease quantity or remove product
cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");

  if (!button) return;

  const id = Number(
    button.dataset.increase ??
    button.dataset.decrease ??
    button.dataset.remove
  );

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

// Open checkout
checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) return;

  checkoutSection.hidden = false;
  orderMessage.textContent = "";

  checkoutSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Place order
checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.size === 0) {
    orderMessage.textContent =
      "Please add a product before placing an order.";
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  const customerName = document
    .getElementById("customer-name")
    .value.trim();

  if (customerName.length < 2) {
    document.getElementById("customer-name").focus();
    return;
  }

  const orderTotal = [...cart.values()].reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderId = `ST-${Date.now().toString().slice(-6)}`;

  orderMessage.textContent =
    `Thank you, ${customerName}! Order ${orderId} placed successfully. Total: ${formatPrice(orderTotal)}.`;

  cart.clear();
  renderCart();
  checkoutForm.reset();
});

// Initialize application
renderProducts();
renderCart();
