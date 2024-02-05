import { useMemo } from 'react'
import { z } from 'zod'
import Button from './ui/button'
import Input from './ui/input'

export const EMAIL_FIELD_VALIDATION = z.string().trim().min(1).email()
export const PASSWORD_FIELD_VALIDATION = z.string().trim().min(6)

export default function AuthForm({
  children,
  onSubmit,
  formState,
  setForm,
  submitted,
  type = 'login'
}) {
  const emailError = useMemo(
    () =>
      submitted && !EMAIL_FIELD_VALIDATION.safeParse(formState.email).success,
    [submitted, formState.email]
  )
  const passwordError = useMemo(
    () =>
      submitted &&
      !PASSWORD_FIELD_VALIDATION.safeParse(formState.password).success,
    [submitted, formState.password]
  )

  return (
    <form className={'grid gap-12'} onSubmit={onSubmit}>
      <div className="grid gap-8">
        <div>
          <Input
            id="email"
            type="text"
            placeholder="Correo electrónico"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            value={formState.email}
          />
          {emailError && (
            <p className="text-left error">
              El campo email es obligatorio y debe ser un email valido
            </p>
          )}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            value={formState.password}
          />
          {passwordError && (
            <p className="text-left error">
              El campo contraseña es obligatorio y debe tener al menos 6
              caracteres
            </p>
          )}
        </div>
        {children}
      </div>
      <footer className="text-center">
        <Button type="submit">
          {type === 'login' ? 'Log in' : 'Registrarse'}
        </Button>
      </footer>
    </form>
  )
}
