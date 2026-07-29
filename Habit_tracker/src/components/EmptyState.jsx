import { Link } from 'react-router-dom'

function EmptyState({
  actionLabel,
  actionTo,
  icon = '+',
  message,
  title,
  tone = 'default',
}) {
  const tones = {
    default: 'bg-[#8a5637]/10 text-[#744326] ring-[#8a5637]/10',
    success: 'bg-emerald-700/10 text-emerald-800 ring-emerald-700/10',
    warning: 'bg-amber-600/15 text-amber-800 ring-amber-600/10',
  }

  return (
    <section className="rounded-[1.7rem] border border-white/75 bg-[#fffaf4]/78 p-8 text-center shadow-sm shadow-stone-900/5 backdrop-blur">
      <div
        className={`mx-auto grid h-12 w-12 place-items-center rounded-full text-xl font-semibold ring-4 ${
          tones[tone] || tones.default
        }`}
      >
        {icon}
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-normal text-stone-950">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">
        {message}
      </p>
      {actionTo && actionLabel ? (
        <Link
          to={actionTo}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/15 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  )
}

export default EmptyState
