
const { test, expect } = require('@playwright/test');

const APP_URL = 'http://127.0.0.1:5500/application/index.html';

// ========================================
// Existing tests: TC-001 to TC-008
// ========================================

test('TC-001: Verify all six products are displayed', async ({ page }) => {
  await page.goto(APP_URL);

  await expect(page.locator('.product-card')).toHaveCount(6);

  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Smart Watch' })
  ).toBeVisible();
});

test('TC-002: Verify product can be added to cart', async ({ page }) => {
  await page.goto(APP_URL);

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await expect(page.locator('#cart-count')).toHaveText('1');

  await expect(
    page.locator('#cart-items').getByText('Wireless Headphones', {
      exact: true
    })
  ).toBeVisible();

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

  await page.getByRole('button', {
    name: 'Add Wireless Headphones to cart'
  }).click();

  await page.locator('#checkout-btn').click();

  await page.getByRole('button', {
    name: /place order/i
  }).click();

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

  await expect(page.locator('#order-message')).toContainText(
    'placed successfully'
  );

  await expect(page.locator('#cart-count')).toHaveText('0');
  await expect(page.locator('#cart-total')).toHaveText('$0.00');
});

// ========================================
// New tests: Product discovery features
// ========================================

test('TC-009: Verify product search works', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#product-search').fill('Camera');

  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Camera' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toHaveCount(0);
});

test('TC-010: Verify category filter works', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#category-filter').selectOption('Audio');

  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toBeVisible();
});

test('TC-011: Verify price filter works', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#price-filter').selectOption('under-50');

  await expect(page.locator('.product-card')).toHaveCount(3);

  await expect(
    page.getByRole('heading', { name: 'Sunglasses' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Backpack' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toBeVisible();
});

test('TC-012: Verify products can be sorted by price', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#sort-products').selectOption('price-low-high');

  const prices = (await page.locator('.product-price').allTextContents())
  .map(price => price.trim());
  expect(prices).toEqual([
    '$25.00',
    '$35.00',
    '$45.00',
    '$55.00',
    '$65.00',
    '$120.00'
  ]);
});

test('TC-013: Verify reset filters restores all products', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#product-search').fill('Camera');
  await page.locator('#category-filter').selectOption('Electronics');
  await page.locator('#price-filter').selectOption('over-100');
  await page.locator('#sort-products').selectOption('price-high-low');

  await expect(page.locator('.product-card')).toHaveCount(1);

  await page.locator('#reset-filters').click();

  await expect(page.locator('#product-search')).toHaveValue('');
  await expect(page.locator('#category-filter')).toHaveValue('all');
  await expect(page.locator('#price-filter')).toHaveValue('all');
  await expect(page.locator('#sort-products')).toHaveValue('default');
  await expect(page.locator('.product-card')).toHaveCount(6);
});

test('TC-014: Verify search and category filters work together', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#product-search').fill('Wireless');
  await page.locator('#category-filter').selectOption('Audio');

  await expect(page.locator('.product-card')).toHaveCount(1);

  await expect(
    page.getByRole('heading', { name: 'Wireless Headphones' })
  ).toBeVisible();
});

test('TC-015: Verify message appears when no products match', async ({ page }) => {
  await page.goto(APP_URL);

  await page.locator('#product-search').fill('ProductDoesNotExist123');

  await expect(page.locator('.product-card')).toHaveCount(0);

  await expect(
    page.getByText('No products found. Try changing your search or filters.')
  ).toBeVisible();

  await expect(page.locator('#product-count')).toHaveText('0 of 6 products');
});
