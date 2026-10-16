# ShopTest QA — Manual Test Cases

| Test Case ID | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-001 | Verify product listing | Open the application | Six products are displayed |
| TC-002 | Add a product to cart | Click Add to Cart on one product | Cart count increases to 1 |
| TC-003 | Increase quantity | Add the same product twice | Cart count becomes 2 |
| TC-004 | Decrease quantity | Click the minus button | Quantity decreases by 1 |
| TC-005 | Remove product | Click Remove | Product disappears from cart |
| TC-006 | Verify cart total | Add two different products | Total equals the sum of their prices |
| TC-007 | Checkout with empty cart | Keep cart empty and inspect checkout | Checkout cannot proceed |
| TC-008 | Submit empty checkout form | Add a product and click Place Order without filling the form | Required-field validation appears |
| TC-009 | Invalid email validation | Enter an invalid email address | Email validation prevents submission |
| TC-010 | Successful order | Add a product, fill all required fields, and place the order | Order confirmation appears |
| TC-011 | Cart reset after order | Complete an order successfully | Cart becomes empty |
| TC-012 | Responsive layout | Resize the browser window | Products remain readable on a small screen |





## Test Execution Record

| Test Case ID | Actual Result | Status |
|---|---|---|
| TC-001 | Six products displayed successfully. | Pass |
| TC-002 | Cart count increased to 1 after adding a product. | Pass |
| TC-003 | Product quantity increased successfully. | Pass |
| TC-004 | Product quantity decreased successfully. | Pass |
| TC-005 | Selected product was removed from the cart. | Pass |
| TC-006 | Cart total was calculated correctly. | Pass |
| TC-007 | Checkout was prevented when the cart was empty. | Pass |
| TC-008 | Required-field validation appeared for an empty form. | Pass |
| TC-009 | Invalid email was rejected by browser validation. | Pass |
| TC-010 | Order confirmation appeared after successful submission. | Pass |
| TC-011 | Cart was empty after order placement. | Pass |
| TC-012 | Layout remained usable on a small screen. | Pass |

**Execution Summary**
- Total Test Cases: 12
- Passed: 12
- Failed: 0
- Blocked: 0
- Not Run: 0

