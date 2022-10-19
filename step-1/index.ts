/**
 * Step 1: Find a price for a specific product
 *
 * In this step, we will create a simple script that will find the price of a product on Amazon.
 *
 * We will use Playwright to automate the browser and get the price of the product.
 *
 * First, get from your browser the URL of the product you want to get the price from.
 *
 * Then, inspect the page to find the element that contains the price (Amazon is a little bit tricky, you will have to inspect the element to find the hidden right one).
 *
 * Once you have found the element, we use the `innerText` method to get the price.
 *
 * Find the element that contains the product title and get the title with the `innerText` method.
 *
 * Finally, we log the price, the title and the url of the product.
 */
import playwright from "playwright";

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // An Amazon URL to a product
  const amazonUrl = "";

  await page.goto(amazonUrl);

  // Add a selector to the element containing the price
  const priceElement = page.locator("");

  // Add a selector to the element containing the product title
  const productTitleElement = page.locator("");

  const price = await priceElement.innerText();
  const productTitle = await productTitleElement.innerText();

  console.log(
    `Price of ${productTitle} is ${price}. Check it on ${page.url()}`
  );

  // Teardown
  await context.close();
  await browser.close();
})();
