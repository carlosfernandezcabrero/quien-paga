export const BASE_CREDENTIALS = {
  email: 'example@gmail.com',
  password: '123456'
}

export async function deleteAccount(page) {
  await page.getByRole('button', { name: 'Open user menu' }).click()
  await page.getByRole('button', { name: 'Borrar cuenta' }).click()
  await page.getByRole('button', { name: 'Eliminar' }).click()
}

export async function createAccount(page) {
  await page
    .getByRole('link', { name: '¿No tienes una cuenta? Crea una' })
    .click()
  await page.locator('input[name="email"]').fill(BASE_CREDENTIALS.email)
  await page.locator('input[name="password"]').fill(BASE_CREDENTIALS.password)
  await page
    .locator('input[name="confirmPassword"]')
    .fill(BASE_CREDENTIALS.password)
  await page.getByRole('button', { name: 'Registrarse' }).click()
}
