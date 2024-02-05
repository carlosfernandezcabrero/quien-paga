import Header from '@/components/header'
import { buttonVariants } from '@/components/ui/button'
import { useUserStore } from '@/stores/user'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const { currentUser } = useUserStore()

  return (
    <>
      <Head>
        <title>¿Quien paga?</title>
      </Head>
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black px-3">
        <div className="flex flex-col min-h-screen mx-auto max-w-[1240px]">
          <Header isLandingPage={true} isHome={true} />

          <main role="main" className="grid flex-1 gap-24 place-content-center">
            <header>
              <h1 className="grid max-w-4xl gap-3 text-center">
                <span className="text-6xl font-medium tracking-tight text-cyan-100">
                  ¿ Quien paga el siguiente ...
                </span>
                <span className="text-xl italic tracking-wide text-right text-cyan-50">
                  desayuno, almuerzo, cafe, etc ?
                </span>
              </h1>
            </header>
            <footer className="max-w-[450px] mx-auto w-full flex justify-center">
              {currentUser === undefined ? (
                <div
                  className={`flex items-center justify-center gap-x-3 ${buttonVariants.variants.size.default} ${buttonVariants.variants.variant.default} ${buttonVariants.base}`}
                >
                  <svg
                    className="w-5 h-5 animate-spin text-cyan-950"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cargando
                </div>
              ) : (
                <Link
                  className={`${buttonVariants.variants.size.default} ${buttonVariants.variants.variant.default} ${buttonVariants.base}`}
                  href={currentUser ? '/dashboard' : '/auth'}
                >
                  Comenzar
                </Link>
              )}
            </footer>
          </main>
        </div>
      </div>
    </>
  )
}
