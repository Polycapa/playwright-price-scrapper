import { Page } from "playwright";
import { ScrapperConfig } from "./Scrapper";

export const AmazonConfig: (index: number) => ScrapperConfig =
  (index: number) => (page: Page) => ({
    locators: {
      firstProductLink: page
        .locator('[data-component-type="s-search-result"]')
        .nth(index)
        .locator("a")
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

export const AmazonConfigs: ScrapperConfig[] = [
  AmazonConfig(0),
  AmazonConfig(1),
  AmazonConfig(2),
];
