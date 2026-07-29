import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import landingBackground from '../assets/landing_background.jpg'

function Landing() {
  const steps = ['Track today', 'Build streaks', 'See progress']

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

      <section className="relative z-10 grid min-h-[calc(100vh-76px)] items-center gap-10 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-[1.1fr_0.8fr] lg:px-14">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="inline-flex rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-semibold text-[#744326] shadow-sm backdrop-blur">
            A calm habit tracker for small daily wins
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
            {steps.map((step) => (
              <span
                key={step}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur"
              >
                <FiCheckCircle className="text-[#744326]" />
                {step}
              </span>
            ))}
          </div>
        </div>

        <aside className="mx-auto w-full max-w-sm rounded-[1.8rem] border border-white/65 bg-white/45 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur-md">
          <p className="text-sm font-semibold text-[#744326]">Today&apos;s flow</p>
          <div className="mt-4 space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/60 px-4 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8a5637]/10 text-sm font-semibold text-[#744326]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-stone-700">
                  {step}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-stone-600">
            Start with one habit, complete it today, then let the dashboard show
            your rhythm.
          </p>
        </aside>
      </section>
    </main>
  )
}

export default Landing
