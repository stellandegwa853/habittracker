import landingBackground from '../assets/landing_background.jpg'

function Landing() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-stone-100 bg-cover bg-center text-stone-900"
      style={{ backgroundImage: `url(${landingBackground})` }}
    >
      <div className="absolute inset-0 bg-stone-100/55 backdrop-blur-[1px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-stone-800">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-stone-700/30 bg-white/35 text-[11px] text-stone-800">
            ✓
          </span>
          <span>VibeCheck</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            className="rounded-full px-4 py-2 font-medium text-stone-700 transition hover:bg-white/35 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30"
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-full border border-stone-800/20 bg-stone-900/85 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="relative z-10 flex min-h-[calc(100vh-76px)] items-center justify-center px-6 pb-20 pt-12 text-center sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-stone-950 sm:text-5xl lg:text-6xl">
            Build Better Habits Every Day
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">
            Track your habits, build streaks, and stay consistent. Small steps
            today, better life tomorrow.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="w-full rounded-full bg-stone-900/90 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30 sm:w-auto"
            >
              Get Started
            </button>
            <button
              type="button"
              className="w-full rounded-full border border-stone-800/20 bg-white/35 px-7 py-3 text-sm font-medium text-stone-800 backdrop-blur-sm transition hover:bg-white/55 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-700/30 sm:w-auto"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
