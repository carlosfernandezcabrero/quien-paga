import Header from '@/components/header'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function DashboardLayout({ children }) {
  const { currentUser } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (currentUser === null) router.replace('/auth')
  }, [currentUser])

  return (
    <div className="min-h-screen px-3 bg-neutral-100 text-neutral-800 dark:bg-slate-800 dark:text-neutral-200">
      <div className="pb-10 mx-auto max-w-screen-2xl md:px-8">
        <Header />
        <main role="main">{currentUser ? children : <></>}</main>
      </div>
    </div>
  )
}
