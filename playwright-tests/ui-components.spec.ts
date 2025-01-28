import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Form Layout Page UI Components page test', async () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Handle input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('testsuper@sdwan.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('onebyone@keys.com', { delay: 500 })

        // General Assertions
        expect(await usingTheGridEmailInput.inputValue()).toEqual('onebyone@keys.com')

        // Locator Assertions
        await expect(usingTheGridEmailInput).toHaveValue('onebyone@keys.com')
    })

    test('Handle radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })

        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        const radioBtnStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()

        expect(radioBtnStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()

        await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeTruthy();
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeFalsy();
    })
});

test('Handle checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });

    const allCheckboxes = page.getByRole('checkbox')

    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.check({ force: true })
        expect(await checkbox.isChecked()).toBeTruthy()

        await checkbox.uncheck({ force: true })
        expect(await checkbox.isChecked()).toBeFalsy()
    }
})

test('Handle lists and dropdowns', async ({ page }) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    page.getByRole('list'); // Used when the list has a ul tag
    page.getByRole('listitem'); // Used when the list has a li tag

    // const options = page.getByRole('list').locator('nb-option')
    const options = page.locator('nb-option-list nb-option')
    await expect(options).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await options.filter({ hasText: 'Cosmic' }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    await dropdownMenu.click()
    for (const color in colors) {
        await options.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != 'Corporate')
            await dropdownMenu.click()
    }
})

test('Handle Tooltip', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await tooltipCard.getByRole('button', { name: 'Top' }).hover()

    page.getByRole('tooltip') // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip');
})

test('Handle Dialog Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})

test('Handle Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Get the row by any test in this row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('100')
    await page.locator('.nb-checkmark').click();

    // Get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@domain.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@domain.com')

    // test filter of the table
    const ages = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = await page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()

            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else (
                expect(cellValue).toEqual(age)
            )
        }
    }
})

test('Handle Date Picker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calenderInputField = page.getByPlaceholder('Form Picker')
    await calenderInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 14) // For 2 weeks later date
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation').getByTestId('chevron-right').click()
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('.day-cell').getByText(expectedDate, { exact: true }).click();
    await expect(calenderInputField).toHaveValue(dateToAssert)
})

test('Handle Sliders', async ({ page }) => {
    // Update Attribute
    const tempGuage = page.locator('[tabtitle="Temperature"]').locator('ngx-temperature-dragger').locator('circle')
    await tempGuage.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGuage.click()

    // Adjust Slider using Mouse Movement
    const tempBox = page.locator('[tabtitle="Temperature"]').locator('ngx-temperature-dragger')
    tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})
