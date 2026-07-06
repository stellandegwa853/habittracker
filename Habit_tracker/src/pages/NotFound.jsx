import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe8] px-6 text-stone-900">
      <section className="w-full max-w-lg rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#744326]">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-stone-950">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          This little path wandered off. Let&apos;s get you back to your habits.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  )
}

export default NotFound
