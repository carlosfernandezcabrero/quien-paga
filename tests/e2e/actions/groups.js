export async function createGroup(page) {
  await page.getByRole('button', { name: 'Añadir grupo' }).click()
  await page.locator('input[name="group_name"]').fill('Test group')
  await page.locator('input[name="participant_name"]').fill('foo')
  await page.getByRole('button', { name: 'Añadir participante' }).click()
  await page.getByRole('button', { name: 'Crear grupo' }).click()
}
