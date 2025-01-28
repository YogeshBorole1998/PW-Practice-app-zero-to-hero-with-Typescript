import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('reusing locators syntax rules test', async ({ page }) => {
    const basicForm = await page.locator('nb-card').filter({ hasText: 'Basic form' })
    const emailInput = basicForm.getByRole('textbox', { name: "Email" })
    const randomEmail = faker.internet.email();

    await emailInput.fill(randomEmail);
    await basicForm.getByRole('textbox', { name: 'Password' }).fill(faker.internet.password())
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailInput).toHaveValue(randomEmail);
    await page.screenshot({ path: 'screenshots/reusing-locators-syntax-rules.png' });
    await basicForm.getByRole('textbox', { name: 'Password' }).screenshot({ path: 'screenshots/reusing-locators-syntax-rules-password.png' });
});
