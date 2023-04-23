import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";

export class CatalogPupupPage extends BasePage{
    readonly page: Page;
    readonly categoryLinkByLinkPart: string
    readonly subCategoryLinkByLinkPart: string
    
    constructor(page: Page){
        super(page);
        this.page = page;
        this.categoryLinkByLinkPart = "a.mm__a[href*='%s']";
        this.subCategoryLinkByLinkPart = "a[href*='%s']";
    }
    
    async hoverOverCategoryByLinkPart(linkPart: string){
        await this.page.hover(this.formatString(this.categoryLinkByLinkPart, linkPart));
    }
    
    async clickOnSubCategoryLinkByLinkPart(linkPart: string) {
      (await this.getFormattedLocator(this.subCategoryLinkByLinkPart, linkPart)).click();
    }
}