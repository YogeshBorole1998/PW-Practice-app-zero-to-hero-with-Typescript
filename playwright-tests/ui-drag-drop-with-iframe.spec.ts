import { test, expect } from '@playwright/test';

test('Handle Drag and Drop with iFrame', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/dragAndDrop/')
    const iFrame = page.frameLocator('[rel-title="Photo Manager"] iframe')

    await iFrame.locator('li', { hasText: 'High Tatras 2' }).dragTo(iFrame.locator('#trash'))

    // More Presice Control
    await iFrame.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await iFrame.locator('#trash').hover()
    await page.mouse.up()

    await expect(iFrame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})
