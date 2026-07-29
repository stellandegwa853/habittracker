import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  FiAward,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import { clearTokens } from '../services/api'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: FiHome },
  { label: 'Habits', to: '/habits', icon: FiCheckCircle },
  { label: 'Calendar', to: '/calendar', icon: FiCalendar },
  { label: 'Statistics', to: '/statistics', icon: FiBarChart2 },
  { label: 'Achievements', to: '/achievements', icon: FiAward },
  { label: 'Profile', to: '/profile', icon: FiUser },
  { label: 'Settings', to: '/settings', icon: FiSettings },
]

const mobileItems = navItems.filter((item) =>
  ['Dashboard', 'Habits', 'Calendar', 'Statistics', 'Profile'].includes(
    item.label,
  ),
)

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const helper = getHelperText(location.pathname)

  function handleLogout() {
    clearTokens()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/70 bg-[#fffaf4]/72 px-5 py-6 shadow-lg shadow-stone-900/4 backdrop-blur-2xl lg:flex lg:flex-col">
        <NavLink to="/dashboard" className="group flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/55">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8a5637] text-sm font-semibold text-white shadow-sm ring-4 ring-[#8a5637]/10">
            ✓
          </span>
          <div>
            <p className="text-lg font-semibold tracking-normal text-stone-950">
              VibeCheck
            </p>
            <p className="text-xs text-stone-500">Daily habit check-ins</p>
          </div>
        </NavLink>

        <nav className="mt-9 space-y-1.5">
          {navItems.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>

        <div className="mt-auto rounded-[1.25rem] border border-white/75 bg-white/55 p-4 shadow-sm">
          <p className="text-sm font-semibold text-stone-900">{helper.title}</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            {helper.message}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition duration-200 hover:bg-white/80 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-[#8a5637]/20"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-[1.6rem] border border-white/75 bg-[#fffaf4]/90 p-2 shadow-2xl shadow-stone-900/15 backdrop-blur-xl lg:hidden">
        {mobileItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                  isActive
                    ? 'bg-[#8a5637] text-white shadow-md shadow-[#8a5637]/20'
                    : 'text-stone-500 hover:bg-white/80 hover:text-stone-900'
                }`
              }
            >
              <Icon className="text-base" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

function SidebarLink({ item }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm transition duration-200 ${
          isActive
            ? 'active bg-white/72 font-semibold text-[#744326] shadow-sm'
            : 'font-medium text-stone-600 hover:bg-white/60 hover:text-stone-950'
        }`
      }
    >
      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-[#8a5637] opacity-0 transition group-[.active]:opacity-100" />
      <Icon className="text-lg" />
      <span className="flex-1">{item.label}</span>
    </NavLink>
  )
}

function getHelperText(pathname) {
  if (pathname.startsWith('/habits')) {
    return {
      title: 'Today first',
      message: 'Complete what is due, then open details only when needed.',
    }
  }

  if (pathname.startsWith('/calendar')) {
    return {
      title: 'History view',
      message: 'Use the calendar to spot patterns across the month.',
    }
  }

  if (pathname.startsWith('/statistics')) {
    return {
      title: 'Progress check',
      message: 'A few consistent days will make the insights more useful.',
    }
  }

  if (pathname.startsWith('/settings')) {
    return {
      title: 'Account controls',
      message: 'Keep reminders and account details up to date.',
    }
  }

  return {
    title: 'Next check-in',
    message: 'Pick one habit and complete it today.',
  }
}

export default Sidebar
