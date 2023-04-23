import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class EventsAndDiscountsPage extends BasePage {
    readonly page: Page;
    readonly datesEndSoonLink: Locator;
    readonly datesEndSoonLabel: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.datesEndSoonLink = page.locator("a[href*='dates-end_soon']");
        this.datesEndSoonLabel = page.locator('span.cd-timer__days-label');
    }
    
    async clickOnDatesEndSoonLink() {
        await this.datesEndSoonLink.click();
    }
    
    async getAllDatesLeftText(): Promise<string[]> {
        return await this.datesEndSoonLabel.allTextContents()
    }
}