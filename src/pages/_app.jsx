import { auth } from '@/lib/firebase'
import { useUserStore } from '@/stores/user'
import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const { setUser } = useUserStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentUser = user
        ? { email: user.email, uid: user.uid, user }
        : null

      setUser(currentUser)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return <Component {...pageProps} />
}
