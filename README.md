# ShopTest QA - Manual & Automation Testing

A mini e-commerce web application built to practice and demonstrate **Manual Software Testing and Automation Testing using Playwright**.

This project covers product discovery, search and filtering, sorting, shopping cart operations, checkout validation, and order placement. It includes documented manual test cases, test execution reports, and an automated browser test suite.

## Project Overview

**Project Name:** ShopTest QA
**Project Type:** Software Quality Assurance (QA) Portfolio Project
**Application:** HTML, CSS, and JavaScript
**Automation Framework:** Playwright
**Automation Language:** JavaScript
**Browser:** Chromium

## Features Tested

### Product Discovery
- Display all six products
- Search products by keyword
- Filter products by category
- Filter products by price
- Sort products by price
- Reset product filters
- Apply search and category filters together
- Display a message when no products match

### Shopping Cart
- Add products to the cart
- Increase product quantity
- Decrease product quantity
- Remove products from the cart
- Calculate and update the cart total
- Handle checkout when the cart is empty

### Checkout
- Validate required customer details
- Validate checkout form input
- Place an order with valid customer details
- Verify successful order confirmation
- Verify cart reset after successful checkout

### User Interface
- Verify product listing and displayed information
- Check responsive layout through manual testing

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application functionality |
| Playwright | Browser automation |
| Git | Version control |
| GitHub | Source code hosting |

## Project Structure

```text
shoptest-qa/
├── application/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── automation/
│   ├── tests/
│   │   └── shoptest.spec.js
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.js
├── manual-testing/
│   ├── bug-reports/
│   ├── screenshots/
│   ├── test-cases/
│   │   └── test-cases.md
│   ├── test-plan.md
│   └── test-reports/
│       ├── test-execution-report.md
│       └── test-summary-report.md
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- A modern web browser

### 1. Clone the Repository

Open PowerShell and run:

```powershell
git clone https://github.com/Rabby1208/shoptest-qa.git
cd shoptest-qa
```

### 2. Run the Web Application

1. Open the `shoptest-qa` folder in Visual Studio Code.
2. Open `application/index.html`.
3. Start the page using the VS Code Live Server extension.
4. Confirm that the application opens in your browser.

The Playwright tests are configured to use this local URL:

```text
http://127.0.0.1:5500/application/index.html
```

If your local server uses a different address or port, update `APP_URL` in `automation/tests/shoptest.spec.js` accordingly.

### 3. Install Automation Dependencies

Open a PowerShell terminal and run:

```powershell
cd automation
npm install
npx playwright install chromium
```

### 4. Run Automated Tests

Keep the web application running, then execute:

```powershell
npx playwright test
```

The automated test suite verifies product listing, cart operations, checkout behavior, search, filtering, sorting, resetting filters, and no-results handling.

### 5. View the Test Report

After running the tests, generate and open the HTML report with:

```powershell
npx playwright show-report
```

The report is available when Playwright has generated it from the test execution. Generated reports and test-result files are excluded from Git by the project's `.gitignore`.

## Testing Results

### Manual Testing

| Metric | Result |
|---|---:|
| Test cases executed | 12 |
| Passed | 12 |
| Failed | 0 |
| Reported pass rate | 100% |

### Playwright Automation Testing

| Metric | Result |
|---|---:|
| Automated tests executed | 15 |
| Passed | 15 |
| Failed | 0 |
| Reported pass rate | 100% |
| Latest recorded execution time | 12.3 seconds |

**Note:** These results reflect the recorded manual checklist and the latest successful Playwright run. They do not guarantee that all possible defects have been found.

## Test Documentation

The `manual-testing/` directory contains the project's test documentation:

- `test-plan.md` - Testing scope and planning
- `test-cases/test-cases.md` - Manual test cases
- `test-reports/test-execution-report.md` - Manual and automation execution results
- `test-reports/test-summary-report.md` - Summary of testing outcomes
- `screenshots/` - Manual testing evidence

The automated test cases are maintained in:

```text
automation/tests/shoptest.spec.js
```

## Skills Demonstrated

- Manual functional testing
- UI testing
- Test case design and execution
- Test reporting and documentation
- JavaScript fundamentals
- Playwright browser automation
- Assertions and element locators
- Form validation testing
- Regression testing
- Git and GitHub version control

## Future Improvements

- Add more automated negative and boundary test cases
- Improve test data management
- Add cross-browser execution
- Integrate automated tests into a CI/CD workflow
- Expand defect documentation and test evidence

## Author

**Rabby Islam**

GitHub: [Rabby1208](https://github.com/Rabby1208)

---

*This project was developed for learning, practicing, and demonstrating software testing skills.*
