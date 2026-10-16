# ShopTest QA – E-commerce Testing Project

## About the Project
ShopTest QA is a mini e-commerce web application created to practice manual software testing and automated testing using Playwright.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Playwright

## Application Features
- View products
- Add products to cart
- Increase and decrease quantity
- Remove products from cart
- Calculate cart total
- Validate checkout form
- Place an order

## Testing Activities
### Manual Testing
- Test cases designed and executed: 12
- Passed: 12
- Failed: 0

### Automation Testing
- Framework: Playwright
- Browser: Chromium
- Automated tests: 8
- Passed: 8
- Failed: 0

## Project Structure
- `application/` – Web application source code
- `manual-testing/` – Test plan, test cases, and reports
- `automation/` – Playwright configuration and tests
- `screenshots/` – Testing evidence

## How to Run the Project
1. Open the project in VS Code.
2. Start the application using Live Server.
3. Open the VS Code terminal.
4. Navigate to the automation folder:

   `cd automation`

5. Install dependencies if needed:

   `npm install`

6. Run automated tests:

   `npx playwright test`

7. Generate an HTML report:

   `npx playwright test --reporter=html`

8. View the report:

   `npx playwright show-report`

## Project Status
The initial manual testing activities and an 8-test Playwright automation suite have been completed successfully.

## Author
QA Testing Portfolio Project
