import { test } from '@playwright/test';

test.skip('Mobile View', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" })

    await usingTheGridEmailInput.fill('testsuper@sdwan.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.type('onebyone@keys.com')
})
