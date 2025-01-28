import { Page } from "@playwright/test"

export class HelperBasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSec: number) {
        await this.page.waitForTimeout(timeInSec * 1000)
    }
}
