import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class MainPage extends BasePage{
    
    readonly page: Page;
    readonly catalogButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly eventsAndDiscountsLink: Locator
    
    constructor(page: Page){
        super(page);
        this.page = page;
        this.catalogButton = page.getByText('Каталог', { exact: true });
        this.searchInput = page.locator('input.search-form__input');
        this.searchButton = page.locator('button.search-form__submit-button');
        this.eventsAndDiscountsLink = page.getByRole('link', { name: 'Акції' });
    }
    
    async openCatalogPopup() {
        await this.catalogButton.click();
    }
    
    async fillSearchInput(searchString: string) {
        await this.searchInput.click();
        await this.searchInput.fill(searchString);
    }
    
    async clickOnSearchButton() {
        await this.searchButton.click();
    }
    
    async clickOnEventsAndDiscountsLink() {
        await this.eventsAndDiscountsLink.click();
    }
}