/* eslint-disable indent */
import { alertError } from '@/alerts'
import AuthForm, {
  EMAIL_FIELD_VALIDATION,
  PASSWORD_FIELD_VALIDATION
} from '@/components/auth-form'
import Input from '@/components/ui/input'
import { contentModalStyles } from '@/components/ui/modal'
import { auth } from '@/lib/firebase'
import { LOGIN } from '@/localstorage-keys'
import { useUserStore } from '@/stores/user'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import Link from 'next/link'
import { useRouter as useRouterNavigation } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

const initialForm = {
  email: '',
  password: ''
}
const initialFormValidation = {
  email: EMAIL_FIELD_VALIDATION,
  password: PASSWORD_FIELD_VALIDATION
}

export default function Auth({ registerUser }) {
  const [form, setForm] = useState(
    registerUser ? { ...initialForm, confirmPassword: '' } : initialForm
  )
  const [submitted, setSubmitted] = useState(false)
  const routerNavigation = useRouterNavigation()
  const router = useRouter()
  const { currentUser } = useUserStore()

  const confirmPasswordError = useMemo(
    () => submitted && registerUser && form.password !== form.confirmPassword,
    [submitted, form.password, form.confirmPassword]
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)

    const formValidation = registerUser
      ? z
          .object(
            registerUser
              ? {
                  ...initialFormValidation,
                  confirmPassword: z.string().optional()
                }
              : initialFormValidation
          )
          .refine(
            ({ password, confirmPassword }) => password === confirmPassword,
            {
              message: "Passwords don't match",
              path: ['confirmPassword']
            }
          )
      : z.object(initialFormValidation)

    if (!formValidation.safeParse(form).success) {
      return
    }

    try {
      if (registerUser) {
        await createUserWithEmailAndPassword(auth, form.email, form.password)
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password)
      }

      localStorage.setItem(LOGIN, 1)

      routerNavigation.replace('/dashboard')
    } catch ({ code }) {
      if (code === 'auth/invalid-credential') {
        alertError({ message: 'Credenciales inválidas' })
      } else if (code === 'auth/email-already-in-use') {
        alertError({ message: 'El correo ya está en uso' })
      } else if (code === 'auth/weak-password') {
        alertError({
          message: 'La contraseña debe tener al menos 6 caracteres'
        })
      } else {
        alertError({ message: 'Error desconocido' })
        console.log(code)
      }
    }
  }

  useEffect(() => {
    if (currentUser) router.replace('/dashboard')
  }, [currentUser])

  return (
    <section className="min-h-screen bg-neutral-100 dark:bg-transparent">
      <h1 className="py-16 text-5xl font-medium text-center dark:text-cyan-100 text-cyan-800">
        QuienPaga
      </h1>
      <div className={`grid gap-8 mx-auto ${contentModalStyles}`}>
        <header>
          <h2 className="pb-2 text-2xl">
            {registerUser ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <div className="h-[1px] rounded-full bg-gray-400"></div>
        </header>

        <AuthForm
          type={registerUser ? 'register' : 'login'}
          title="Iniciar sesión"
          onSubmit={handleSubmit}
          formState={form}
          setForm={setForm}
          submitted={submitted}
        >
          {registerUser ? (
            <div>
              <Input
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                type="password"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))
                }
                value={form.confirmPassword}
              />
              {confirmPasswordError ? (
                <p className="error">Las contraseñas no coinciden</p>
              ) : null}
            </div>
          ) : null}
        </AuthForm>

        <footer>
          <Link
            href={registerUser ? '/auth' : '/auth?register=true'}
            className="font-medium underline"
          >
            {registerUser
              ? '¿Ya tienes una cuenta? Inicia sesión'
              : '¿No tienes una cuenta? Crea una'}
          </Link>
        </footer>
      </div>
    </section>
  )
}

export async function getServerSideProps({ query }) {
  return { props: { registerUser: query.register === 'true' ? 1 : 0 } }
}
