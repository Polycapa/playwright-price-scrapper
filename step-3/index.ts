/**
 * Step 3: Find a price for multiple websites
 *
 * In this step, we will create a simple script that will find the price of a product on multiple websites.
 *
 * We have created a class "Scrapper" that will get the price of a product from a page containing code looking like the one from step 1 and 2.
 *
 * This class gets a configuration in the constructor that contains the selectors for the search input, the search button, the first product in the search results and the element containing the price.
 *
 * The script will loop over your configurations, create a scrapper for each configuration and get the price of the product for each scrapper. Then it will display it in a table.
 *
 * We have created a config for Amazon based on the code from step 2.
 *
 * Your goal is to create a config for a website of your choice and add it to the configs array.
 */

import { join } from "path";
import playwright from "playwright";
import { table } from "table";
import UserAgent from "user-agents";
import { AmazonConfig } from "./AmazonConfig";
import { Scrapper, ScrapperConfig } from "./Scrapper";

const getPriceFromScrapper = async (
  scrapper: Scrapper,
  search: string
): Promise<[productTitle: string, price: string, productUrl: string]> => {
  const { price, productTitle, productUrl } = await scrapper.getPriceForASearch(
    search
  );
  return [productTitle, price, productUrl];
};

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({
    // We add a random user agent to avoid being blocked by the website
    userAgent: new UserAgent({
      deviceCategory: "desktop",
    }).toString(),
    viewport: {
      height: 1080,
      width: 1920,
    },
  });

  // All your configurations for each site. You can add as many as you want.
  const scrapperConfigs: ScrapperConfig[] = [AmazonConfig];
  const search = "";

  const data: [string, string, string][] = [
    ["Product Title", "Price", "Product URL"],
    ...(await Promise.all(
      scrapperConfigs.map(async (config) => {
        // We create a new page to have something clean for each scrapper
        const page = await context.newPage();
        try {
          // We create the scrapper and get the price for the search
          const scrapper = new Scrapper(page, config);
          const [productTitle, price, productUrl] = await getPriceFromScrapper(
            scrapper,
            search
          );
          return [productTitle, price, productUrl] as [string, string, string];
        } catch (error) {
          // If something goes wrong (like website blocking bots), we return a default value
          const url = config(page).websiteUrl;

          // We take a screenshot of the page to see what's going on
          await page.screenshot({
            path: join(
              __dirname,
              "../screenshots",
              `${url.replace(/https?:\/\//, "")}.png`
            ),
          });
          return [
            `Error for ${url}`,
            `Error for ${url}`,
            `Error for ${url}`,
          ] as [string, string, string];
        }
      })
    )),
  ];

  console.log(table(data));

  // Teardown
  await context.close();
  await browser.close();
})();
