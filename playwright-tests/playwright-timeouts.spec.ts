import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
});

test('playwright time out syntax rules test', async ({ page }) => {
    const successMsg = await page.locator('.bg-success')

    await expect(successMsg).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
    await successMsg.click() // By default : no timeout
    await successMsg.click({ timeout: 20000 })
});

/**
 * ▶️ Global Timeout : (default: no timeout) => Time limit of the whole test run 
 * ▶️ Test Timeout : (default: 30000 ms) => Time limit for the single test
 * ▶️ Action Timeout : (default: no timeout) => Time limit for the action command e.g. click(), fill(), textContent(), etc..
 * ▶️ Navigation Timeout : (default: no timeout) => Time limit for the action command e.g. page.goto('/)
 * ▶️ Global Timeout : (default: 5000 ms) => Time limit for expect locator assertions. e.g. expect(locator).toHaveText('Hello World')
 * 
 * ▶️ test.setTimeout(10000)
 * ▶️ test.slow() => Multiply by timeout * 3 times
 */
