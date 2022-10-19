import { Page } from "playwright";
import { ScrapperConfig } from "./Scrapper";

export const CDiscountConfig: ScrapperConfig = (page: Page) => ({
  locators: {
    firstProductLink: page
      .locator(".prdtBlocInline")
      .nth(0)
      .locator("a")
      .nth(0),
    price: page.locator(".price.hideFromPro"),
    productTitle: page.locator("h1"),
    searchBar: page.locator(".hSrcInput").locator("input"),
    searchButton: page.locator(".hSrcInput").locator("button"),
  },
  websiteUrl: "https://www.cdiscount.com",
});
