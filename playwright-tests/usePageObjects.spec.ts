import { test } from '@playwright/test';
import { PageManager } from './page-objects/page-manager';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navigate to form page', async ({ page }) => {
    const pageManager = new PageManager(page)
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.navigateTo().datePickerPage()
    await pageManager.navigateTo().smartTablePage()
    await pageManager.navigateTo().toastrPage()
    await pageManager.navigateTo().tooltipPage()
});

test('Parametrized methods', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test123@gmail.com', 'Pass@1234', 'Option 2');
});

test.skip('Date picker page', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test123@gmail.com', 'Pass@1234', 'Option 2');
    await pageManager.navigateTo().datePickerPage()
    await pageManager.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    await pageManager.onDatePickerPage().selectDatePickerWithRangeFromToday(2, 5)
});
