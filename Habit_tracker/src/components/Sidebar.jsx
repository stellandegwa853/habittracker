import { NavLink } from 'react-router-dom'
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
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/70 bg-white/45 px-5 py-6 shadow-xl shadow-stone-900/5 backdrop-blur-xl lg:flex lg:flex-col">
        <NavLink to="/dashboard" className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8a5637] text-sm font-semibold text-white shadow-sm">
            ✓
          </span>
          <div>
            <p className="text-lg font-semibold tracking-normal text-stone-950">
              VibeCheck
            </p>
            <p className="text-xs text-stone-500">Build quietly</p>
          </div>
        </NavLink>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/70 bg-white/45 p-4">
          <p className="text-sm font-medium text-stone-800">Small win</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            Show up once today. That still counts.
          </p>
          <NavLink
            to="/login"
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-white/70 hover:text-stone-950"
          >
            <FiLogOut />
            Logout
          </NavLink>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-3xl border border-white/70 bg-white/80 p-2 shadow-2xl shadow-stone-900/15 backdrop-blur-xl lg:hidden">
        {mobileItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                  isActive
                    ? 'bg-[#8a5637] text-white'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
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
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
          isActive
            ? 'bg-[#8a5637] text-white shadow-lg shadow-[#8a5637]/20'
            : 'text-stone-600 hover:bg-white/70 hover:text-stone-950'
        }`
      }
    >
      <Icon className="text-lg" />
      {item.label}
    </NavLink>
  )
}

export default Sidebar
