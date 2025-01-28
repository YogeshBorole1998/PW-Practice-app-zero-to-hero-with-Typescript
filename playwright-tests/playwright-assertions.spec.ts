import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('playwright assertions syntax rules test', async ({ page }) => {
    const basicFormBtn = await page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')

    const buttonText = await basicFormBtn.textContent()
    expect(buttonText).toEqual('Submit')

    await expect(basicFormBtn).toHaveText('Submit')

    // // Soft assertion - used if you want to continue your test if assertion failed
    //  await expect.soft(basicFormBtn).toHaveText('Submit5')
    // await basicFormBtn.click()
});
