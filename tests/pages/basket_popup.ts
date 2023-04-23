import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class BasketPopup extends BasePage {
    readonly page: Page;
    readonly closebasketPopupIcon: Locator;
    readonly itemPrice: Locator;
    readonly totalPrice: Locator;
    readonly removeItemIcon: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.closebasketPopupIcon = page.locator("div.v-modal__close-btn");
        this.itemPrice = page.locator('div.price-box__cur');
        this.totalPrice = page.locator('span.total-box__price');
        this.removeItemIcon = page.locator('a~.remove');
    }
    
    async clickOnCloseBasketPopupIcon() {
        await this.closebasketPopupIcon.click();
    }
    
    async getItemsPrices(): Promise<string[]> {
        return (await this.itemPrice.allTextContents());
    }
    
    getTotalPriceLocator(): Locator {
        return this.totalPrice;
    }
    
    async removeFirstItemFromBasket() {
        await this.removeItemIcon.nth(0).click();
    }
}