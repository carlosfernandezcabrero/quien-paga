import { expect, test } from '@playwright/test'
import { createAccount } from './actions/auth'
import { createGroup } from './actions/groups'
import firebaseAdmin from './firbase'

test.beforeEach(async ({ page }) => {
  await page.goto('/auth')
})

test('Cannot see a group without login', async ({ page }) => {
  await page.goto('/group/1')

  await expect(page).toHaveURL('/auth')
})

test.describe('With auth', () => {
  test.beforeEach(async ({ page }) => {
    await createAccount(page)
    await page.waitForURL('/dashboard')
    await createGroup(page)
    await page.getByRole('link', { name: 'Ver' }).click()
  })

  test.afterEach(async () => {
    await firebaseAdmin.auth.deleteAllUsers()
    await firebaseAdmin.db.deleteAllGroups()
  })

  test('The h1 and title is correct', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Test group')
    expect(await page.title()).toBe('Grupo: Test group')
  })

  test('Can add a participant to a group', async ({ page }) => {
    await page.locator('#participant_name').fill('bar')
    await page.getByRole('button', { name: 'Añadir' }).click()

    await expect(page.locator('table tbody tr')).toHaveCount(2)
    await expect(page.getByRole('row', { name: 'bar 0 Borrar' })).toBeVisible()
  })

  test('When start a raffle show list of participants with input checked', async ({
    page
  }) => {
    await page.locator('#participant_name').fill('bar')
    await page.getByRole('button', { name: 'Añadir' }).click()
    await page.getByRole('button', { name: 'Preparar sorteo' }).click()

    await expect(page.locator('main ul li')).toHaveCount(2)

    for (const locator of await page.locator('main ul li').all()) {
      await expect(locator.locator('input')).toBeChecked()
    }
  })

  test('Can run riffle and add paid to winner', async ({ page }) => {
    await page.locator('#participant_name').fill('bar')
    await page.getByRole('button', { name: 'Añadir' }).click()
    await page.getByRole('button', { name: 'Preparar sorteo' }).click()
    await page.getByRole('button', { name: 'Empezar sorteo' }).click()

    await page.waitForSelector('text=Quien paga es')

    await page.getByRole('button', { name: 'Aceptar' }).click()

    await expect(
      page.getByRole('row', {
        name: `${await page.getByTestId('winner').textContent()} 1 Borrar`
      })
    ).toBeVisible()
  })

  test('Can run again the riffle', async ({ page }) => {
    await page.locator('#participant_name').fill('bar')
    await page.getByRole('button', { name: 'Añadir' }).click()
    await page.getByRole('button', { name: 'Preparar sorteo' }).click()
    await page.getByRole('button', { name: 'Empezar sorteo' }).click()

    await page.waitForSelector('text=Quien paga es')

    await page.getByRole('button', { name: 'Volver a sortear' }).click()

    await page.waitForSelector('text=Quien paga es')
  })
})
