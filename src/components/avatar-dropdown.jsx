import { alertDialog } from '@/alerts'
import { auth } from '@/lib/firebase'
import { useUserStore } from '@/stores/user'
import { deleteUser, signOut } from 'firebase/auth'
import { User } from 'lucide-react'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import Button from './ui/button'
import WithClickOutside from './with-click-outside'

const AvatarDropdown = forwardRef(({ open, setOpen }, ref) => {
  const {
    currentUser: { email, user }
  } = useUserStore()
  const router = useRouter()

  return (
    <div ref={ref}>
      <button
        className={`p-1.5  border dark:border-slate-600 border-slate-300 rounded-full ${
          open
            ? 'dark:bg-slate-600 bg-slate-300'
            : 'dark:bg-slate-700 bg-slate-200'
        }`}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open user menu</span>
        <User size={30} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 translate-x-6 translate-y-2 border divide-y rounded-md shadow dark:divide-slate-500 divide-slate-400 w-44 dark:border-slate-500 border-slate-400 dark:bg-slate-700 bg-slate-100">
          <div className="px-4 py-3 text-sm text-black dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul className="py-2 text-sm dark:text-neutral-200 text-neutral-800">
            <li>
              <button
                href="#"
                className="block w-full px-4 py-2 text-left text-red-600 dark:text-red-200 dark:hover:bg-slate-800 hover:bg-slate-300"
                onClick={() => {
                  alertDialog({
                    title: 'Eliminar cuenta',
                    message: '¿Estás seguro de que quieres eliminar tu cuenta?',
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteUser(user).then(() => router.replace('/auth'))
                    }
                  })
                }}
              >
                Borrar cuenta
              </button>
            </li>
          </ul>
          <footer className="py-3 text-center">
            <Button
              variant="danger"
              onClick={() => signOut(auth).then(() => router.replace('/auth'))}
            >
              Cerrar sesión
            </Button>
          </footer>
        </div>
      )}
    </div>
  )
})

export default WithClickOutside(AvatarDropdown)
