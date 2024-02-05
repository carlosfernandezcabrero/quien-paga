import { User } from 'lucide-react'
import Button from './ui/button'

export default function ParticipantRowList({
  participant,
  onDelete,
  bigIcon = false
}) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <User size={bigIcon ? 30 : 26} />
        <h3>{participant}</h3>
      </div>
      <Button variant="danger" size="sm" onClick={() => onDelete()}>
        Eliminar
      </Button>
    </li>
  )
}
