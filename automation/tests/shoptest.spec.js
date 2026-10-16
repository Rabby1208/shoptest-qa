
const { test, expect } = require('@playwright/test');

const APP_URL = 'http://127.0.0.1:5500/application/index.html';

test('TC-001: Verify all six products are displayed', async ({ page }) => {
  await page.goto(APP_URL);

  // Verify that all six products are displayed
  await expect(page.locator('.product-card')).toHaveCount(6);

  // Verify important product names
  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Smart Watch' })
  ).toBeVisible();
});

test('TC-002: Verify product can be added to cart', async ({ page }) => {
  await page.goto(APP_URL);

  // Add Wireless Headphones to the cart
  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  // Verify cart item count
  await expect(page.locator('#cart-count')).toHaveText('1');

  // Verify product appears inside the cart
  await expect(
    page.locator('#cart-items').getByText('Wireless Headphones', {
      exact: true
    })
  ).toBeVisible();

  // Verify cart total
  await expect(page.locator('#cart-total')).toHaveText('$45.00');
});


test('TC-003: Verify quantity increases and cart total updates', async ({ page }) => {
  await page.goto(APP_URL);

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await page.getByRole('button', {
    name: 'Increase Wireless Headphones quantity'
  }).click();

  await expect(page.locator('#cart-count')).toHaveText('2');
  await expect(page.locator('#cart-total')).toHaveText('$90.00');
});

test('TC-004: Verify quantity decreases', async ({ page }) => {
  await page.goto(APP_URL);

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await page.getByRole('button', {
    name: 'Increase Wireless Headphones quantity'
  }).click();

  await page.getByRole('button', {
    name: 'Decrease Wireless Headphones quantity'
  }).click();

  await expect(page.locator('#cart-count')).toHaveText('1');
  await expect(page.locator('#cart-total')).toHaveText('$45.00');
});

test('TC-005: Verify product can be removed from cart', async ({ page }) => {
  await page.goto(APP_URL);

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await page.getByRole('button', {
    name: 'Remove Wireless Headphones'
  }).click();

  await expect(page.locator('#cart-count')).toHaveText('0');
  await expect(page.locator('#cart-total')).toHaveText('$0.00');
  await expect(page.locator('#checkout-btn')).toBeDisabled();
});

test('TC-006: Verify checkout is disabled when cart is empty', async ({ page }) => {
  await page.goto(APP_URL);

  await expect(page.locator('#cart-count')).toHaveText('0');
  await expect(page.locator('#cart-total')).toHaveText('$0.00');
  await expect(page.locator('#checkout-btn')).toBeDisabled();
});

test('TC-007: Verify checkout form rejects empty customer details', async ({ page }) => {
  await page.goto(APP_URL);

  // Add a product so checkout becomes available
  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  // Open checkout
  await page.locator('#checkout-btn').click();

  // Try to submit without entering customer details
  await page.getByRole('button', {
    name: /place order|submit order|complete order/i
  }).click();

  // Required fields should prevent submission
  await expect(page.locator('#customer-name')).toHaveAttribute('required', '');
  await expect(page.locator('#customer-email')).toHaveAttribute('required', '');
  await expect(page.locator('#customer-address')).toHaveAttribute('required', '');
});

test('TC-008: Verify successful checkout with valid customer details', async ({ page }) => {
  await page.goto(APP_URL);

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await page.locator('#checkout-btn').click();

  await page.locator('#customer-name').fill('Test Customer');
  await page.locator('#customer-email').fill('test@example.com');
  await page.locator('#customer-address').fill('Dhaka, Bangladesh');

  await page.locator('#checkout-form').evaluate(form => {
    form.requestSubmit();
  });

  await expect(page.locator('#order-message')).toBeVisible();
  await expect(page.locator('#cart-count')).toHaveText('0');
  await expect(page.locator('#cart-total')).toHaveText('$0.00');
});
