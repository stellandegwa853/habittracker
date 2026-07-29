import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import landingBackground from '../assets/landing_background.jpg'

function Landing() {
  const week = [70, 95, 55, 80, 100, 35, 0]

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-stone-100 bg-cover bg-center text-stone-900"
      style={{ backgroundImage: `url(${landingBackground})` }}
    >
      <div className="absolute inset-0 bg-[#f7f1ea]/45 backdrop-blur-[1px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-stone-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-700/20 bg-white/45 text-xs text-[#744326] shadow-sm">
            ✓
          </span>
          <span>VibeCheck</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 font-medium text-stone-700 transition hover:bg-white/35 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full border border-stone-800/20 bg-[#8a5637] px-4 py-2 font-semibold text-white shadow-sm shadow-[#8a5637]/15 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-stone-700/30"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 grid min-h-[calc(100vh-76px)] items-center gap-10 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-[1.05fr_0.85fr] lg:px-14">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="inline-flex rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-semibold text-[#744326] shadow-sm backdrop-blur">
            Daily check-ins without the pressure
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-normal text-stone-950 sm:text-5xl lg:text-6xl">
            Build Better Habits Every Day
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg lg:text-balance">
            Track your habits, build streaks, and stay consistent. Small steps
            today, better life tomorrow.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8a5637] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/20 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-stone-700/30 sm:w-auto"
            >
              Get Started
              <FiArrowRight />
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-full border border-stone-800/20 bg-white/35 px-7 py-3 text-sm font-medium text-stone-800 backdrop-blur-sm transition hover:bg-white/55 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30 sm:w-auto"
            >
              Login
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {['Today', 'Streaks', 'Progress'].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur"
              >
                <FiCheckCircle className="text-[#744326]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <aside className="mx-auto w-full max-w-md rounded-[1.8rem] border border-white/70 bg-white/52 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#744326]">
                Today&apos;s check-in
              </p>
              <p className="mt-1 text-xs text-stone-500">3 of 5 completed</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              On track
            </span>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-white/75 bg-white/65 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-400">
                  Next habit
                </p>
                <h2 className="mt-2 text-xl font-semibold text-stone-950">
                  Evening Run
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Health · Evening · Daily
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                Pending
              </span>
            </div>
            <span className="mt-4 flex w-full justify-center rounded-full bg-[#8a5637] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#8a5637]/15">
              Complete Today
            </span>
          </div>

          <div className="mt-5 grid grid-cols-[auto_1fr] gap-4">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[conic-gradient(#8a5637_64%,rgba(214,201,185,0.72)_0)]">
              <div className="grid h-[76%] w-[76%] place-items-center rounded-full bg-[#fffaf4]">
                <span className="text-xl font-semibold text-stone-950">64%</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-stone-800">
                Weekly rhythm
              </p>
              <div className="mt-3 flex h-14 items-end gap-1.5">
                {week.map((value, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-full bg-[#8a5637]/80"
                    style={{ height: `${Math.max(value, 8)}%` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-stone-500">
                A quick view of what the app tracks.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Landing
