import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
    
    async waitWhilePageLoaded(){
        await this.page.waitForLoadState('networkidle');
    }

    async waitABit(milisec: number) {
        await this.page.waitForTimeout(5000)
    }

    async clickElementByTitle(title: string){
        await this.page.getByTitle(title).click();
    }

    async getFormattedLocator(locatorToBeFormated: string, arg: any): Promise<Locator> {
        return this.page.locator(locatorToBeFormated.replace("%s", arg));
    }

    formatString(str: string, arg: any): string {
        return str.replace('%s', arg);
    }
}