import { Locator, Page } from "playwright";

export type ScrapperConfig = (page: Page) => {
  locators: {
    searchBar: Locator;
    searchButton: Locator;
    firstProductLink: Locator;
    price: Locator;
    productTitle: Locator;
  };
  websiteUrl: string;
};

export class Scrapper {
  constructor(
    private readonly page: Page,
    private readonly scrapperConfig: ScrapperConfig
  ) {}

  async getPriceForASearch(
    search: string
  ): Promise<{ price: string; productTitle: string; productUrl: string }> {
    const {
      locators: { firstProductLink, searchBar, searchButton },
      websiteUrl,
    } = this.scrapperConfig(this.page);

    await this.page.goto(websiteUrl);

    // Type your search into the search bar
    await searchBar.fill(search);

    // Click the search button
    await searchButton.click();

    // Click on the first product in the search results
    await firstProductLink.click();

    return this.getProductPrice();
  }

  private async getProductPrice(): Promise<{
    price: string;
    productTitle: string;
    productUrl: string;
  }> {
    const { price: priceLocator, productTitle: productTitleLocator } =
      this.scrapperConfig(this.page).locators;
    const price = await priceLocator.innerText();
    const productTitle = await productTitleLocator.innerText();

    return { price, productTitle, productUrl: this.page.url() };
  }
}
