---
theme: light-icons
---


# Build a scrapper with Playwright

Discover how to use Playwright to extract prices from Amazon.

---

# Getting started

1. Clone [Git repo](https://github.com/Polycapa/playwright-price-scrapper)
2. Install [VSCode](https://code.visualstudio.com/)

Recommended way to open the project is to use devcontainer (install Docker and [VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)). Otherwise, you'll need NodeJS.

Then, run

```bash
npm install
```
---

# Step 1

**Goal**: find a price for a specific product.

We'll find the url for one product and the "locators".

A locator is the way for Playwright to be able to access an element on the page. To create it, you'll need the selector of the element.

You can get the selector from the browser inspector.

<img src="/locator.png" class="m-30 h-30 rounded" />

---
layout: two-cols
---


# Step 1

Code is available in `step-1/index.ts`.

Run it with

```bash
npm run step-1
```

And let's see how to fill the missing part !

::right::

```typescript{2|5|8}
// Url to your product
const amazonUrl = "";

// Add a selector to the element containing the price
const priceElement = page.locator("");

// Add a selector to the element containing the product title
const productTitleElement = page.locator("");
```

---
layout: two-cols
---

# Step 2

**Goal**: find a price for the first search result.

We'll use what was done on first step but add a way to do a search and open the first result.

Code is available in `step-2/index.ts`.

Run it with

```bash
npm run step-2
```

::right::

```typescript{all|3|5|7|13,14,15,16}
await page.goto("https://www.amazon.fr");

const searchBarInput = page.locator("");

const searchButton = page.locator("");

const search = "";

await searchBarInput.fill(search);

await searchButton.click();

const firstProduct = page.locator("")
                      .nth(0)
                      .locator("a")
                      .nth(0);

await firstProduct.click();
```

---
layout: two-cols
---

# Step 3

**Goal**: do it for multiple sites.

Code is available in `step-3/index.ts`.

Run it with

```bash
npm run step-3
```

::right::

Added a constant containing all locators we created from second step.
```typescript
export const AmazonConfig:  ScrapperConfig = (page: Page) => ({
    locators: {
      firstProductLink: page
        .locator('[data-component-type="s-search-result"]')
        .nth(0),
      price: page.locator(
        "#corePriceDisplay_desktop_feature_div span.priceToPay .a-offscreen"
      ),
      productTitle: page.locator("#productTitle"),
      searchBar: page.locator("#twotabsearchtextbox"),
      searchButton: page.locator("#nav-search-submit-button"),
    },
    websiteUrl: "https://www.amazon.fr",
});
```
Add a new config and set a search string.

```typescript{all|1|2}
  const scrapperConfigs: ScrapperConfig[] = [AmazonConfig];
  const search = "";
```

---
layout: center
---

# END