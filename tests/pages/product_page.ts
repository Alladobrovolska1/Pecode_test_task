import { ElementHandle, Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class ProductPage extends BasePage {
    readonly page: Page;
    readonly viewResultsButton: Locator;
    readonly productCardContainer: Locator;
    readonly priceOnProductCard: Locator;
    readonly buyIconByProductName: string;
    readonly orderSelect: string;

    constructor(page: Page) {
        super(page);
        this.page = page
        this.viewResultsButton = page.locator("span.front-figure__wrapper");
        this.productCardContainer = page.locator("a.product-card__title");
        this.priceOnProductCard = page.locator("div[class='v-pb'] span.sum");
        this.buyIconByProductName = "//div[@class='product-card__content' and contains(.,'%s')]//div[@class='product-card__buy-box']//button"
        this.orderSelect = 'span.sort-by__current';
    }

    async clickOnItemOnFilterPanel(filterItem: string) {
        await this.page.locator('a[data-id]').filter({ hasText: filterItem }).click();
    }

    async clickOnViewResultButton() {
        await this.viewResultsButton.click();
    }

    async getAllProductCards(): Promise<string[]> {
        return await this.productCardContainer.allTextContents();
    }

    async expandFilter(filterName: string) {
        await this.page.locator(".header-title").filter({ hasText: filterName }).click();
    }

    async hoverOverOrderSelect() {
        await this.page.hover(this.orderSelect);
    };

    async clickOnOrderItemByTitle(title: string) {
        await this.clickElementByTitle(title);
    }

    async clickOnBuyIconOnProductCatalogPageByName(productName: string) {
        await (await this.getFormattedLocator(this.buyIconByProductName, productName)).click()
    }

    async clickOnProductItemByText(productName: string) {
        await this.productCardContainer.filter({ hasText: productName }).click();
    }

    async getPricesForProductCards(): Promise<string[]> {
        return await this.priceOnProductCard.allTextContents();
    }
}