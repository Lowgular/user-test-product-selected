# Task 123: Communicate Between Components

> Make sure that two components can communicate between each other:
>
> - Component A sends a message
> - Component B receives & displays it

---

## Acceptance Criteria

```gherkin
Feature: Show selected product

  Scenario: Click Show more button
    Given there are 3 products
    Then I should see 3 product cards
    And I should see N/A placeholder product in the product details
    When I click on the second card's "Show more" button
    Then the product detail view shows product 2 data
```

> This is a super quick overview of what needs to be done, however if you need more intro head into [Folder structure](#folder-structure) section below

## Quick Start

### 1. Start the app

```bash
npm start
```

### 2. Run the tests

By default it runs on `http://localhost:4200`.  
 If you need a different host/port, set:

```bash
export APP_URL=http://localhost:3001
```

Once this is setup, you can run:

```bash
npm test
```

> By default, this opens the Playwright Test Runner UI so you can click through scenarios.
> Need a different mode? See [Advanced Test Modes](#advanced-test-modes) below.

### 3. Push your solution

```bash
lg push
```

### Advanced Test Modes

- Headless (CI-style)

```bash
npm run test:ci
```

- Headed browser (for debugging)

```bash
npm run test:headed
```

### Folder structure

You’ll find:

- `src/app/` — your Angular starter code
- `.e2e/` — test-runner package.json & helpers
  - `.e2e/src/` - files with actual e2e tests
- `package.json` — aliased scripts: start, test, test:ui, test:headed
- `README.md` — this file
