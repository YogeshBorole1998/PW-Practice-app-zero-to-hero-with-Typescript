import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('extracting values syntax rules test', async ({ page }) => {
    const basicForm = await page.locator('nb-card').filter({ hasText: 'Basic form' })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    // input value
    const emailInput = basicForm.getByRole('textbox', { name: "Email" })
    await emailInput.fill('testsuper@sdwan.com');
    const emailInputValue = await emailInput.inputValue()
    expect(emailInputValue).toEqual('testsuper@sdwan.com')

    const placeHolderValue = await emailInput.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email');
});
