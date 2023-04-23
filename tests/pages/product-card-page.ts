import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class ProductCard extends BasePage {
    readonly page: Page;
    readonly buyButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.buyButton = page.locator('#product-buy-button');
    }
    
    async clickOnBuyButton() {
      await this.buyButton.click();
    }
}