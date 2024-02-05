import { expect, test } from '@playwright/test'

test('Should be have title "¿Quien paga?"', async ({ page }) => {
  expect(await page.title()).toBe('¿Quien paga?')
})
