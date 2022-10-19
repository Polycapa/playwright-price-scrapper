/**
 * Step 2: Find a price for the first search result
 *
 * In this step, we will create a simple script that will find the price of the first product on Amazon for a specific search.
 *
 * We have created a function "getProductPrice" that will get the price of a product from a page containing code looking like the one from step 1.
 *
 * First, inspect the page to get the selectors for the search input and the search button.
 *
 * Fill your search in the search input and click on the search button.
 *
 * Then, search for your product and get the selector for one search item. Search for some div with attributes like "data-...", this attribute must be the same for all the search items. We have added the code to help you get the product link in this div.
 *
 * Once you have found the element, we go to the page of the product and get the price with the function "getProductPrice".
 *
 */
import playwright, { Page } from "playwright";

const getProductPrice = async (page: Page) => {
  // Add a selector for the element containing the price
  const priceElement = page.locator(
    "#corePriceDisplay_desktop_feature_div span.priceToPay .a-offscreen"
  );

  // Add a selector for the element containing the product title
  const productTitleElement = page.locator("#productTitle");

  const price = await priceElement.innerText();
  const productTitle = await productTitleElement.innerText();

  return { price, productTitle, productUrl: page.url() };
};

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.amazon.fr");

  // Add a selector for the search bar on the Amazon homepage
  const searchBarInput = page.locator("");

  // Add a selector for the search button on the Amazon homepage
  const searchButton = page.locator("");

  // Your search string
  const search = "";

  // Type your search into the search bar
  await searchBarInput.fill(search);

  // Click the search button
  await searchButton.click();

  // Add a selector for the first product in the search results
  const firstProduct = page.locator("").nth(0).locator("a").nth(0);

  // Click on the first product in the search results
  await firstProduct.click();

  const { price, productTitle, productUrl } = await getProductPrice(page);

  console.log(
    `Price of ${productTitle} is ${price}. Check it on ${productUrl}`
  );

  // Teardown
  await context.close();
  await browser.close();
})();
