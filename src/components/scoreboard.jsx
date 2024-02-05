import api from '@/api'
import { PARTICIPANT } from '@/defaults'
import { useUserStore } from '@/stores/user'
import { PARTICIPANT_FIELD_VALIDATION } from '@/validations'
import { useState } from 'react'
import PanelTitle from './panel-title'
import TableWrapper from './table-wrapper'
import TrBody from './tr-body'
import TrHead from './tr-head'
import Button from './ui/button'
import Input from './ui/input'
import Td from './ui/table/Td'
import Th from './ui/table/th'

export default function Scoreboard({ participants, group }) {
  const [participant, setParticipant] = useState('')

  const {
    currentUser: { uid }
  } = useUserStore()

  async function addParticipant(event) {
    event.preventDefault()

    if (!PARTICIPANT_FIELD_VALIDATION.safeParse(participant).success) {
      return
    }

    await api.participants.create(uid, group, participant, PARTICIPANT)
    setParticipant('')
  }

  return (
    <div className="grid gap-4">
      <PanelTitle>Participantes del grupo</PanelTitle>

      <div className="max-w-[500px] w-full mx-auto">
        {participants.length ? (
          <TableWrapper>
            <thead>
              <TrHead>
                <Th>Nombre</Th>
                <Th className="text-center">Pagados</Th>
                <Th>Acciones</Th>
              </TrHead>
            </thead>
            <tbody>
              {participants.map(({ id, paid }) => (
                <TrBody key={id}>
                  <Td className="capitalize">{id}</Td>
                  <Td className="text-center">{paid}</Td>
                  <Td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        api.participants.deleteById(uid, group, id)
                      }
                    >
                      Borrar
                    </Button>
                  </Td>
                </TrBody>
              ))}
            </tbody>
          </TableWrapper>
        ) : (
          <p className="font-bold text-center text-slate-300">
            No hay participantes
          </p>
        )}
        <footer>
          <form className="flex mt-4 gap-x-2" onSubmit={addParticipant}>
            <Input
              id="participant_name"
              placeholder="Añadir participante"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
            <Button type="submit" variant="secondary">
              Añadir
            </Button>
          </form>
        </footer>
      </div>
    </div>
  )
}
