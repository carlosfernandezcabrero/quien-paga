import { alertError } from '@/alerts'
import api from '@/api'
import PageTitle from '@/components/page-title'
import PanelTitle from '@/components/panel-title'
import Scoreboard from '@/components/scoreboard'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import DashboardLayout from '@/layouts/dashboard-layout'
import { useUserStore } from '@/stores/user'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

export default function Group() {
  const { slug } = useRouter().query
  const { currentUser } = useUserStore()
  const [doc, setDoc] = useState()
  const [chooseParticipants, setChooseParticipants] = useState(false)
  const [currentParticipants, setCurrentParticipants] = useState()
  const [winner, setWinner] = useState(false)
  const [slotItem, setSlotItem] = useState()
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    if (!currentUser) return

    const unsubscribe1 = api.participants.byGroupIdObserver(
      currentUser.uid,
      slug,
      (_participants) =>
        setDoc((prev) => ({
          ...prev,
          participants: _participants.docs.map((_doc) => ({
            ..._doc.data(),
            id: _doc.id
          }))
        }))
    )

    const unsubscribe2 = api.groups.byIdObserver(
      currentUser.uid,
      slug,
      async (_group) => {
        setDoc((prev) => ({
          ...prev,
          ..._group.data()
        }))
      }
    )

    // Clean up
    return () => {
      unsubscribe1()
      unsubscribe2()
    }
  }, [currentUser])

  async function launchDraw() {
    setSlotItem()
    setChooseParticipants(false)
    setWinner(false)
    setLaunched(false)

    const participants = doc.participants.filter(
      (_, i) => currentParticipants[i]
    )

    if (participants.length === 0) {
      alertError({ message: 'Debe haber al menos un participante' })
      return
    }

    const participantsSorted = participants.sort((a, b) => a.paid - b.paid)
    const lessParticipant = participantsSorted[0].paid
    const lessParticipantsPaid = participantsSorted.filter(
      ({ paid }) => paid === lessParticipant
    )

    const _winner =
      lessParticipantsPaid[
        Math.floor(Math.random() * lessParticipantsPaid.length)
      ]

    setLaunched(true)
    for (const _participant of participants.slice(0, 10)) {
      setSlotItem(_participant)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setWinner(true)
    setSlotItem(_winner)
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Grupo: {doc?.name || ''}</title>
      </Head>
      <Suspense fallback={<p>Cargando...</p>}>
        {doc && (
          <div className="grid gap-10 px-4 py-8 border rounded-md dark:bg-slate-700 dark:border-slate-700 bg-slate-200 border-slate-300">
            <PageTitle className="justify-center">{doc.name}</PageTitle>

            <div className="grid gap-y-20">
              <div className="grid max-w-2xl gap-4 mx-auto">
                {!winner && chooseParticipants && (
                  <PanelTitle>Elija los participantes del sorteo</PanelTitle>
                )}
                {launched && (
                  <div className="text-6xl text-center">
                    <p className="text-xl leading-none text-center text-black dark:text-white">
                      Quien paga es
                    </p>
                    {winner ? (
                      <p
                        className="mt-2 font-semibold leading-none tracking-wider text-center text-7xl dark:text-cyan-100 text-cyan-700"
                        data-testid="winner"
                      >
                        {slotItem.id}
                      </p>
                    ) : (
                      <motion.p
                        animate={{
                          scale: [0.95, 1, 0.95],
                          y: [-40, 0, 40],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 0.19 }}
                        className="mt-2 font-semibold leading-none tracking-wider text-center text-7xl "
                        key={slotItem.id}
                      >
                        {slotItem.id}
                      </motion.p>
                    )}
                  </div>
                )}
                {chooseParticipants && (
                  <ul>
                    {doc.participants.map(({ id }, i) => (
                      <li
                        key={id}
                        className="flex items-center justify-start gap-x-3"
                      >
                        <Input
                          size="empty"
                          id={`participant_${i}`}
                          type="checkbox"
                          variant="checkbox"
                          checked={currentParticipants[i]}
                          onChange={(e) => {
                            setCurrentParticipants((prev) =>
                              prev.map((value, j) =>
                                i === j ? e.target.checked : value
                              )
                            )
                          }}
                        />
                        <label htmlFor={`participant_${i}`} className="text-lg">
                          {id}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                <footer className="flex items-center mt-6 gap-x-4">
                  {winner ? (
                    <>
                      <Button onClick={launchDraw} variant="outline">
                        Volver a sortear
                      </Button>
                      <Button
                        onClick={async () => {
                          await api.participants.update(
                            currentUser.uid,
                            slug,
                            slotItem.id,
                            {
                              paid: slotItem.paid + 1
                            }
                          )

                          setWinner(false)
                          setChooseParticipants(false)
                          setLaunched(false)
                          setSlotItem()
                        }}
                      >
                        Aceptar
                      </Button>
                    </>
                  ) : (
                    <>
                      {!launched && (
                        <>
                          {chooseParticipants ? (
                            <Button onClick={launchDraw}>Empezar sorteo</Button>
                          ) : (
                            <Button
                              onClick={() => {
                                if (doc.participants.length === 0) {
                                  alertError({
                                    message:
                                      'Debe haber al menos un participante'
                                  })
                                  return
                                }

                                setCurrentParticipants(
                                  Array(doc.participants.length).fill(true)
                                )
                                setChooseParticipants(true)
                              }}
                            >
                              Preparar sorteo
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </footer>
              </div>
              {!chooseParticipants && !winner && !launched && (
                <Scoreboard participants={doc.participants} group={slug} />
              )}
            </div>
          </div>
        )}
      </Suspense>
    </DashboardLayout>
  )
}
