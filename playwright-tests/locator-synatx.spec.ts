import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('locator syntax rules test @smoke @regression', async ({ page }) => {
    // By Tag Name 
    page.locator('input')
    await page.locator('input').first().click()

    // By ID 
    page.locator('#inputEmail')

    // By Class
    page.locator('.shape-rectangle')

    // By attribute
    page.locator('[placeholder="Email"]')
    page.getByPlaceholder('Email')

    // By Class Value (Full) 
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // Combine different selectors
    page.locator('input [placeholder="Email"] [nbinput]')
    page.locator('input').getByPlaceholder('Email').locator('nbinput')

    // By Xpath (Not Recommended) : https://playwright.dev/docs/other-locators#xpath-locator
    page.locator('//*[@id="inputEmail"]')

    // By partial text match
    page.locator(':text("Using")')

    // By exact text match
    page.locator(':text-is("Using the Grid")')
});
