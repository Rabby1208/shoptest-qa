# ShopTest QA - Test Execution Report

## 1. Report Information

| Field | Details |
|---|---|
| Project | ShopTest QA |
| Testing Types | Manual Functional/UI Testing and Automation Testing |
| Manual Test Environment | Windows, Chrome/Edge |
| Automation Framework | Playwright |
| Automation Browser | Chromium |
| Manual Test Cases Executed | 12 |
| Automated Test Cases Executed | 15 |
| Execution Status | Completed |

## 2. Manual Test Execution Summary

| Status | Total |
|---|---:|
| Passed | 12 |
| Failed | 0 |
| Blocked | 0 |
| Not Run | 0 |
| **Total** | **12** |

**Manual Testing Pass Rate:** 100%

## 3. Manual Test Results

| Test ID | Test Scenario | Status |
|---|---|---|
| MT-001 | Product Listing | PASS |
| MT-002 | Product Search | PASS |
| MT-003 | Category Filter | PASS |
| MT-004 | Price Filter | PASS |
| MT-005 | Product Sorting | PASS |
| MT-006 | Reset Filters | PASS |
| MT-007 | Combined Filters | PASS |
| MT-008 | No Results Handling | PASS |
| MT-009 | Add to Cart | PASS |
| MT-010 | Cart Quantity and Total | PASS |
| MT-011 | Checkout Validation | PASS |
| MT-012 | Successful Order Placement | PASS |

## 4. Automation Test Execution Summary

| Status | Total |
|---|---:|
| Passed | 15 |
| Failed | 0 |
| **Total** | **15** |

**Automation Testing Pass Rate:** 100%

## 5. Automated Test Results

| Test ID | Test Scenario | Status |
|---|---|---|
| TC-001 | Verify all six products are displayed | PASS |
| TC-002 | Verify product can be added to cart | PASS |
| TC-003 | Verify quantity increases and cart total updates | PASS |
| TC-004 | Verify quantity decreases | PASS |
| TC-005 | Verify product can be removed from cart | PASS |
| TC-006 | Verify checkout is disabled when cart is empty | PASS |
| TC-007 | Verify checkout form rejects empty customer details | PASS |
| TC-008 | Verify successful checkout with valid customer details | PASS |
| TC-009 | Verify product search works | PASS |
| TC-010 | Verify category filter works | PASS |
| TC-011 | Verify price filter works | PASS |
| TC-012 | Verify products can be sorted by price | PASS |
| TC-013 | Verify reset filters restores all products | PASS |
| TC-014 | Verify search and category filters work together | PASS |
| TC-015 | Verify message appears when no products match | PASS |

## 6. Test Coverage

The recorded testing covered:

- Product listing and product information
- Product search
- Category and price filtering
- Product sorting
- Resetting filters
- Combined search and filter operations
- No-results handling
- Adding products to the cart
- Increasing and decreasing quantities
- Removing products and calculating cart totals
- Empty-cart checkout behavior
- Checkout form validation
- Successful order placement
- Manual UI and responsive-layout checks

## 7. Defects

No test failures were reported in the recorded manual checklist or the latest Playwright execution.

This does not guarantee that the application is completely free of defects. Additional testing may identify issues not covered by these test cases.

## 8. Test Execution Conclusion

The recorded manual test execution completed with 12 out of 12 test cases passing.

The latest Playwright execution completed with 15 out of 15 automated tests passing in 12.3 seconds.

Both recorded test runs had a 100% pass rate, with no reported failures.

## 9. Next Steps

1. Review the test documentation for consistency.
2. Verify the latest project changes and Git status.
3. Commit the verified changes to Git.
4. Push the final project changes to the GitHub main branch.

**Note:** Results reflect the reported manual checklist and the latest Playwright execution output.
