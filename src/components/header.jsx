/* eslint-disable indent */
import { useUserStore } from '@/stores/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AvatarDropdown from './avatar-dropdown'

const THEME_TRANS = {
  dark: true,
  light: false,
  true: 'dark',
  false: 'light'
}

export default function Header({ isLandingPage = false, isHome = false }) {
  const { currentUser } = useUserStore()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme')
    const themeVariant = themeFromLocalStorage
      ? Boolean(Number(themeFromLocalStorage))
      : document.documentElement.classList.contains('dark')
      ? THEME_TRANS.dark
      : THEME_TRANS.light

    if (themeVariant) document.documentElement.classList.add(THEME_TRANS.true)

    setTheme(themeVariant)
  }, [])

  return (
    <header className="flex flex-col items-center justify-between gap-8 pt-8 sm:flex-row pb-14">
      <div>
        <Link
          href={currentUser ? '/dashboard' : '/'}
          className={`text-lg font-semibold tracking-tight ${
            isHome ? 'text-neutral-300' : 'text-neutral-700'
          } dark:text-neutral-300`}
        >
          QuienPaga
        </Link>
      </div>
      {!isLandingPage && (
        <div className="w-full">
          <ul className="flex items-center justify-center w-full sm:justify-end gap-x-10">
            <li>
              <label className="relative inline-flex items-center cursor-pointer">
                <span className="text-sm font-medium me-3">☀️ Claro</span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={theme}
                  value={theme}
                  onChange={() => {
                    setTheme((prev) => {
                      const newThemeValue = !prev
                      const newThemeColor = THEME_TRANS[newThemeValue]

                      if (newThemeColor === THEME_TRANS.true) {
                        document.documentElement.classList.add(THEME_TRANS.true)
                      } else {
                        document.documentElement.classList.remove(
                          THEME_TRANS.true
                        )
                      }

                      localStorage.setItem('theme', Number(newThemeValue))

                      return newThemeValue
                    })
                  }}
                />
                <div className="w-11 h-6 bg-slate-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                <span className="text-sm font-medium ms-3">🌙 Oscuro</span>
              </label>
            </li>
            {currentUser && (
              <li>
                <AvatarDropdown />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
