import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { userProfile } from '../utils/mockData'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/habits': 'My Habits',
  '/habits/create': 'Create Habit',
  '/calendar': 'Habit Calendar',
  '/statistics': 'Progress & Statistics',
  '/achievements': 'Achievements',
  '/profile': 'Profile',
  '/settings': 'Settings',
}

function Topbar() {
  const location = useLocation()
  const title = useMemo(() => {
    if (pageTitles[location.pathname]) {
      return pageTitles[location.pathname]
    }

    if (location.pathname.includes('/habits/') && location.pathname.endsWith('/edit')) {
      return 'Edit Habit'
    }

    if (location.pathname.includes('/habits/')) {
      return 'Habit Details'
    }

    return 'VibeCheck'
  }, [location.pathname])

  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f4efe8]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-stone-950">
            {title}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Hey, {userProfile.firstName}. You&apos;re building quietly.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-w-0 items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 text-sm text-stone-500 shadow-sm">
            <FiSearch className="shrink-0" />
            <input
              type="search"
              placeholder="Quick search"
              className="w-full bg-transparent text-stone-800 outline-none placeholder:text-stone-400 sm:w-36 lg:w-44"
            />
          </label>

          <div className="flex items-center justify-between gap-3 rounded-full border border-white/80 bg-white/60 px-3 py-2 shadow-sm sm:justify-start">
            <span className="text-sm font-medium text-stone-600">{dateLabel}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8a5637] text-sm font-semibold text-white">
              {userProfile.initials}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
