import { Page } from "@playwright/test";

export class FormLayoutsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, OptionText: string): Promise<void> {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: OptionText }).click({ force: true })
        await usingTheGridForm.getByRole('button').click()
    }
}
