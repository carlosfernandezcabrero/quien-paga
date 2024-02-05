import api from '@/api'
import AddGroupModal from '@/components/add-group-modal'
import GroupCard from '@/components/group-card'
import PageTitle from '@/components/page-title'
import Portal from '@/components/portal'
import Button from '@/components/ui/button'
import DashboardLayout from '@/layouts/dashboard-layout'
import { useUserStore } from '@/stores/user'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const [groups, setGroups] = useState([])

  const { currentUser } = useUserStore()

  useEffect(() => {
    if (!currentUser) return

    const unsubscribe = api.groups.listObserver(
      currentUser.uid,
      async (res) => {
        const _groups = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))

        setGroups(_groups)
      }
    )

    // Clean up
    return () => unsubscribe()
  }, [currentUser])

  return (
    <DashboardLayout>
      <Head>
        <title>Tus grupos</title>
      </Head>
      <section className="grid gap-10">
        <div className="flex flex-col items-center justify-between gap-8 tracking-wide sm:flex-row">
          <PageTitle>
            <span className="flex items-center justify-center text-xl font-bold text-white rounded-full dark:text-neutral-900 w-7 h-7 bg-cyan-800 dark:bg-cyan-100">
              {groups.length}
            </span>
            Tus grupos
          </PageTitle>
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            Añadir grupo
          </Button>
        </div>
        <ul className="flex flex-wrap justify-center gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </ul>
      </section>
      {showForm && (
        <Portal>
          <AddGroupModal onClose={() => setShowForm(false)} />
        </Portal>
      )}
    </DashboardLayout>
  )
}
