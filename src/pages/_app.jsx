import { auth } from '@/lib/firebase'
import { useUserStore } from '@/stores/user'
import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
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

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Aplicación para ver a quien le toca pagar la cuenta de entre los que menos haya pagado hasta el momento."
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
