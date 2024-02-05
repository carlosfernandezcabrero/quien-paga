import { alertError } from '@/alerts'
import api from '@/api'
import { PARTICIPANT } from '@/defaults'
import { useUserStore } from '@/stores/user'
import { PARTICIPANT_FIELD_VALIDATION } from '@/validations'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import ParticipantRowList from './participant-row-list'
import Button from './ui/button'
import Input from './ui/input'
import Modal from './ui/modal'

const NAME_FIELD_VALIDATION = z.string().trim().min(1)
const PARTICIPANTS_FIELD_VALIDATION = z.array(z.string().trim().min(1)).min(1)

export default function AddGroupModal({ onClose }) {
  const [name, setName] = useState('')
  const [participant, setParticipant] = useState('')
  const [participants, setParticipants] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const {
    currentUser: { uid }
  } = useUserStore()

  const nameFieldError = useMemo(
    () => submitted && !NAME_FIELD_VALIDATION.safeParse(name).success,
    [name, submitted]
  )
  const participantsFieldError = useMemo(
    () =>
      submitted &&
      !PARTICIPANTS_FIELD_VALIDATION.safeParse(participants).success,
    [participants, submitted]
  )

  async function handleSummit(e) {
    e.preventDefault()
    setSubmitted(true)

    if (
      !NAME_FIELD_VALIDATION.safeParse(name).success ||
      !PARTICIPANTS_FIELD_VALIDATION.safeParse(participants).success
    ) {
      return
    }

    const actualGroups = await api.groups.list(uid)

    if (actualGroups.some((_group) => _group.name === name)) {
      alertError({ message: 'Ya existe un grupo con ese nombre' })
      return
    }

    const { id: _id } = await api.groups.create(uid, {
      name
    })

    participants.forEach(async (participant) => {
      await api.participants.create(uid, _id, participant, PARTICIPANT)
    })

    onClose()
  }

  return (
    <Modal>
      <h2 className="mb-10 text-2xl">Añadir grupo</h2>

      <form className="grid gap-14" onSubmit={handleSummit}>
        <div className="grid gap-8">
          <div>
            <Input
              id="group_name"
              placeholder="Nombre del grupo"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {nameFieldError && (
              <p className="error">El campo nombre es obligatorio</p>
            )}
          </div>
          <div>
            <div className="flex mb-6 gap-x-3">
              <Input
                id="participant_name"
                placeholder="Nombre del participante"
                onChange={(e) => setParticipant(e.target.value)}
                value={participant}
              />

              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  if (
                    !PARTICIPANT_FIELD_VALIDATION.safeParse(participant).success
                  ) {
                    return
                  }
                  if (participants.includes(participant)) {
                    alertError({
                      message: 'Ya existe un participante con ese nombre'
                    })
                    return
                  }

                  setParticipants((prev) => [...prev, participant])
                  setParticipant('')
                }}
              >
                Añadir participante
              </Button>
            </div>
            <div>
              <h3 className="mb-3 text-xl">Participantes</h3>
              {participants.length ? (
                <ul className="grid gap-1">
                  {participants.map((_participant) => (
                    <ParticipantRowList
                      key={_participant}
                      participant={_participant}
                      onDelete={() =>
                        setParticipants((prev) =>
                          prev.filter((name) => name !== _participant)
                        )
                      }
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-base font-semibold text-center text-gray-500 dark:text-gray-400">
                  No hay participantes todavía
                </p>
              )}
              {participantsFieldError && (
                <p className="error">Debe haber al menos un participante</p>
              )}
            </div>
          </div>
        </div>
        <footer className="flex items-center justify-center gap-x-6">
          <Button type="submit">Crear grupo</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
