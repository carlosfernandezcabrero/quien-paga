import { expect, test } from '@playwright/test'
import { createAccount } from './actions/auth'
import { createGroup } from './actions/groups'
import firebaseAdmin from './firbase'

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard')
})

test('Cannot access to dashboard without login', async ({ page }) => {
  await expect(page).toHaveURL('/auth')
})

test.describe('With auth', () => {
  test.beforeEach(async ({ page }) => {
    await createAccount(page)
    await page.waitForURL('/dashboard')
  })

  test.afterEach(async () => {
    await firebaseAdmin.auth.deleteAllUsers()
    await firebaseAdmin.db.deleteAllGroups()
  })

  test('The title and h1 should be "0Tus grupos"', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('0Tus grupos')
    expect(await page.title()).toBe('Tus grupos')
  })

  test('Cannot create a group without participants', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()
    await page.locator('input[name="group_name"]').fill('Test group')
    await page.getByRole('button', { name: 'Crear grupo' }).click()

    await expect(
      page.getByText('Debe haber al menos un participante')
    ).toBeVisible()
  })

  test('Cannot create a group without name', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()
    await page.locator('input[name="participant_name"]').fill('foo')
    await page.getByRole('button', { name: 'Añadir participante' }).click()
    await page.getByRole('button', { name: 'Crear grupo' }).click()

    await expect(page.getByText('El campo nombre es obligatorio')).toBeVisible()
  })

  test('Can create a group', async ({ page }) => {
    await createGroup(page)

    await expect(page.locator('main li')).toHaveCount(1)
    await expect(page.locator('main li h3')).toHaveText('Test group')
    await expect(page.locator('main li p')).toHaveText('Participantes: 1')
  })

  test('Can delete a group', async ({ page }) => {
    await createGroup(page)
    await page.getByRole('button', { name: 'Borrar' }).click()
    await page.getByRole('button', { name: 'Borrar' }).click()

    await expect(page.locator('main ul')).toBeEmpty()
  })

  test('Can rename group name', async ({ page }) => {
    await createGroup(page)
    await page.getByRole('button', { name: 'Renombrar' }).click()
    await page.locator('#swal2-input').fill('New name')
    await page.getByRole('button', { name: 'Renombrar' }).click()

    await expect(page.locator('main li')).toHaveCount(1)
    await expect(page.locator('main li h3')).toHaveText('New name')
    await expect(page.locator('main li p')).toHaveText('Participantes: 1')
  })

  test('Can add a participant', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()
    await page.locator('input[name="participant_name"]').fill('foo')
    await page.getByRole('button', { name: 'Añadir participante' }).click()

    await expect(page.locator('form li')).toHaveCount(1)
    await expect(page.locator('form li h3')).toHaveText('foo')
  })

  test('Can delete a participant', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()
    await page.locator('input[name="participant_name"]').fill('foo')
    await page.getByRole('button', { name: 'Añadir participante' }).click()
    await page.getByRole('button', { name: 'Eliminar' }).click()

    await expect(page.locator('form li')).toHaveCount(0)
    await expect(page.getByText('No hay participantes todavía')).toBeVisible()
  })

  test('Should be show text when there are no participants', async ({
    page
  }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()

    await expect(page.getByText('No hay participantes todavía')).toBeVisible()
  })

  test('When add participant inside group, should be reflect in group card', async ({
    page
  }) => {
    await createGroup(page)
    await page.waitForSelector('text=Ver')
    await page.getByRole('link', { name: 'Ver' }).click()
    await page.locator('input[name="participant_name"]').fill('bar')
    await page.getByRole('button', { name: 'Añadir' }).click()
    await page.goto('/dashboard')

    await expect(page.locator('main li p')).toHaveText('Participantes: 2')
  })

  test('Cannot create a group with same name', async ({ page }) => {
    await createGroup(page)
    await createGroup(page)

    await expect(
      page.getByText('Ya existe un grupo con ese nombre')
    ).toBeVisible()
  })

  test('Cannot add a participant with same name', async ({ page }) => {
    await page.getByRole('button', { name: 'Añadir grupo' }).click()
    await page.locator('input[name="group_name"]').fill('Test group')
    await page.locator('input[name="participant_name"]').fill('foo')
    await page.getByRole('button', { name: 'Añadir participante' }).click()
    await page.locator('input[name="participant_name"]').fill('foo')
    await page.getByRole('button', { name: 'Añadir participante' }).click()

    await expect(
      page.getByText('Ya existe un participante con ese nombre')
    ).toBeVisible()
  })
})
