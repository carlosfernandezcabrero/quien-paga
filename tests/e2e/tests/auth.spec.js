import { expect, test } from '@playwright/test'
import {
  BASE_CREDENTIALS,
  closeSession,
  createAccount,
  deleteAccount
} from '../actions/auth'
import firebaseAdmin from '../lib/firbase'

test.beforeEach(async ({ page }) => {
  await page.goto('/auth')
})

test('Default auth page is for log in', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('text=Comenzar')
  await page.getByRole('link', { name: 'Comenzar' }).click()

  await expect(page).toHaveURL('/auth')
  await expect(page.locator('h2')).toHaveText('Iniciar sesión')
})

test('Can delete account', async ({ page }) => {
  await createAccount(page)
  await deleteAccount(page)

  await expect(page).toHaveURL('/auth')
})

test('Email not registered', async ({ page }) => {
  await page.locator('input[name="email"]').fill('incorrect@gmail.com')
  await page.locator('input[name="password"]').fill(BASE_CREDENTIALS.password)
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Credenciales inválidas')).toBeVisible()
})

test('Show error when email is not valid', async ({ page }) => {
  await page.locator('input[name="email"]').fill('i')
  await page.locator('input[name="password"]').fill(BASE_CREDENTIALS.password)
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(
    page.getByText('El campo email es obligatorio y debe ser un email valido')
  ).toBeVisible()
})

test('Show error when password is not valid by length', async ({ page }) => {
  await page.locator('input[name="email"]').fill(BASE_CREDENTIALS.email)
  await page.locator('input[name="password"]').fill('12345')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(
    page.getByText(
      'El campo contraseña es obligatorio y debe tener al menos 6 caracteres'
    )
  ).toBeVisible()
})

test('Password incorrect', async ({ page }) => {
  await page.locator('input[name="email"]').fill(BASE_CREDENTIALS.email)
  await page.locator('input[name="password"]').fill('incorrect')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Credenciales inválidas')).toBeVisible()
})

test('Email incorrect', async ({ page }) => {
  await page.locator('input[name="email"]').fill('incorrect@gmail.com')
  await page.locator('input[name="password"]').fill(BASE_CREDENTIALS.password)
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Credenciales inválidas')).toBeVisible()
})

test.describe('Need delete account', () => {
  test.afterEach(async () => {
    await firebaseAdmin.auth.deleteAllUsers()
  })

  test('Can log in', async ({ page }) => {
    await createAccount(page)
    await closeSession(page)
    await page.locator('input[name="email"]').fill(BASE_CREDENTIALS.email)
    await page.locator('input[name="password"]').fill(BASE_CREDENTIALS.password)
    await page.getByRole('button', { name: 'Log in' }).click()

    await page.waitForURL('/dashboard')

    await expect(page).toHaveURL('/dashboard')
  })

  test('Can register', async ({ page }) => {
    await createAccount(page)

    await expect(page).toHaveURL('/dashboard')
  })

  test('Email already in use', async ({ page }) => {
    await createAccount(page)
    await closeSession(page)
    await createAccount(page)

    await expect(page.getByText('El correo ya está en uso')).toBeVisible()
  })
})

test.describe('Auth actions  with user created', () => {
  test.beforeEach(async ({ page }) => {
    await createAccount(page)
    await page.waitForURL('/dashboard')
  })

  test.afterEach(async () => {
    await firebaseAdmin.auth.deleteAllUsers()
  })

  test('When go to auth page redirect to dashboard if is logged', async ({
    page
  }) => {
    await page.goto('/auth')

    await expect(page).toHaveURL('/dashboard')
  })
})
