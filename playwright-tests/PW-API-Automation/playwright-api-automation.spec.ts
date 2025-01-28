import { test, expect } from '@playwright/test';
// TypeScript (or JavaScript with certain configurations) doesn't allow direct JSON imports unless the --resolveJsonModule option is enabled in the TypeScript configuration.
// const tags = require('../../playwright-tests/API-Automation/Test-Data/tags.json');
import tags from '../PW-API-Automation/Test-Data/tags.json'

test.beforeEach(async ({ page }) => {
    // await page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
    await page.route('*/**/api/tags', async route => {
        // const tags = {
        //     "tags": [
        //         "Cybage",
        //         "Software"
        //     ]
        // }
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/');
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', { name: 'Email' }).fill('borole116@gmail.com')
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@1998')
    await page.getByRole('button').click()
});

test('To display the mock article using api', async ({ page }) => {
    // URL : https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json();
        responseBody.articles[0].title = 'Senior QA Automation Engineer'
        responseBody.articles[0].description = 'I am selected in Cybage Software Solution'

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toContainText('Senior QA Automation Engineer')
    await expect(page.locator('app-article-list p').first()).toContainText('I am selected in Cybage Software Solution')
});

test('To Create the article using api - POST', async ({ page, request }) => {
    const loginRes = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": { "email": "borole116@gmail.com", "password": "Test@1998" }
        }
    })

    const responseBody = await loginRes.json()
    const accessTocken = responseBody.user.token

    const creationRes = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": { "title": "Associate II Senior Software Engineer", "description": "Working at Capgemini, Pune, Maharashtra", "body": "Hey I've 3.2 Years of working experience at Capgemini as a Software Automation Engineer. ", "tagList": ["CG"] }
        },
        headers: {
            Authorization: `Token ${accessTocken}`
        }
    })

    expect(creationRes.status()).toEqual(201)

    await page.getByText('Global Feed').click()
    await page.getByText('Associate II Senior Software Engineer').click()
    await page.getByRole('button', { name: 'Delete Article' }).first().click()

    await expect(page.locator('app-article-list h1').first()).not.toContainText('Associate II Senior Software Engineer')
});

test('To Delete the article using api - DELETE', async ({ page, request }) => {
    await page.getByText('New Article').click()
    await page.getByRole('textbox', { name: 'Article Title' }).fill('Delete Article using DELETE API')
    await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Udemy Course')
    await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('Playwright Automation')
    await page.getByRole('button', { name: 'Publish Article' }).click()
    const creationRes = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await creationRes.json()
    const slug = articleResponseBody.article.slug

    await expect(page.locator('.article-page h1')).toContainText('Delete Article using DELETE API')
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).toContainText('Delete Article using DELETE API')

    const loginRes = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": { "email": "borole116@gmail.com", "password": "Test@1998" }
        }
    })

    const responseBody = await loginRes.json()
    const accessTocken = responseBody.user.token
    const deleteArticleRes = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: {
            Authorization: `Token ${accessTocken}`
        }
    })

    expect(deleteArticleRes.status()).toEqual(204)
});

// npx playwright test --debug => To see result