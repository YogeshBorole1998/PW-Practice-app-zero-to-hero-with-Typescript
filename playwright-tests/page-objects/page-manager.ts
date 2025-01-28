import { Page } from "@playwright/test";
import { NavigationPage } from "./navigation-page";
import { DatePickerPage } from "./date-picker-page";
import { FormLayoutsPage } from "./form-layout-page";

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(page)
        this.formLayoutsPage = new FormLayoutsPage(page)
        this.datePickerPage = new DatePickerPage(page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }
}
