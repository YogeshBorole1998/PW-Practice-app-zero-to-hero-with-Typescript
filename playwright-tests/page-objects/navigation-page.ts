import { Locator, Page } from "@playwright/test";
import { HelperBasePage } from "./helper-base-page";

export class NavigationPage extends HelperBasePage {
    readonly formLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        super(page)
        this.formLayoutMenuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuItem = this.page.getByText('Datepicker')
        this.smartTableMenuItem = this.page.getByText('Smart Table')
        this.toastrMenuItem = this.page.getByText('Toastr')
        this.tooltipMenuItem = this.page.getByText('Tooltip')
    }

    async formLayoutsPage(): Promise<void> {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutMenuItem.click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage(): Promise<void> {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage(): Promise<void> {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage(): Promise<void> {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage(): Promise<void> {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string): Promise<void> {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click();
        }
    }
}
