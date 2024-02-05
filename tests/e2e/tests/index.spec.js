import { expect, test } from '@playwright/test'

test('Should be have title "¿Quien paga?"', async ({ page }) => {
  await page.goto('/')
  expect(await page.title()).toBe('¿Quien paga?')
})
