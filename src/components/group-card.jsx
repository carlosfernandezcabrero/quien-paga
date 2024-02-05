import { alertDialog, alertWithInputText } from '@/alerts'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import { ArrowUpRightFromSquare, FileX2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ButtonIcon from './button-icon'
import Button, { buttonVariants } from './ui/button'

export default function GroupCard({ group: { name, id } }) {
  const { currentUser } = useUserStore()
  const [numParticipants, setNumParticipants] = useState()

  const { uid } = currentUser

  useEffect(() => {
    if (!currentUser) return

    const unsubscribe = api.groups.numParticipantsObserver(uid, id, (res) => {
      setNumParticipants(res)
    })

    // cleanup
    return () => unsubscribe()
  }, [currentUser])

  return (
    <li className="grid w-full gap-8 p-4 bg-gray-100 border border-gray-700 rounded-md shadow-md dark:bg-gray-900 max-w-96">
      <div className="grid gap-3">
        <h3 className="text-lg font-medium break-all text-wrap">{name}</h3>
        <p className="text-base dark:text-neutral-300">
          Participantes: {numParticipants}
        </p>
      </div>
      <footer className="flex items-center gap-x-4">
        <ButtonIcon
          variant="danger"
          size="sm"
          text="Borrar"
          onClick={() => {
            alertDialog({
              title: '¿Estás seguro?',
              message: 'Esta acción es irreversible',
              confirmButtonText: 'Borrar',
              cancelButtonText: 'Cancelar'
            }).then((res) => {
              if (res.isDismissed) return

              api.groups.delete(uid, id)
            })
          }}
        >
          <FileX2 size="20" />
        </ButtonIcon>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            alertWithInputText({
              title: 'Nuevo nombre',
              confirmButtonText: 'Renombrar'
            }).then((res) => {
              if (res.isDismissed) return

              api.groups.update(currentUser.uid, id, {
                name: res.value
              })
            })
          }}
        >
          Renombrar
        </Button>
        <Link
          href={`/group/${id}`}
          target="_blank"
          size="sm"
          className={`flex items-center gap-x-2 ${buttonVariants.base} ${buttonVariants.variants.variant.default} ${buttonVariants.variants.size.sm}`}
        >
          <ArrowUpRightFromSquare size="20" />
          Ver
        </Link>
      </footer>
    </li>
  )
}
