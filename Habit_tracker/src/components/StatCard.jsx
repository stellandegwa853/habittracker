function StatCard({ helper, icon: Icon, label, tone = 'coffee', value }) {
  const tones = {
    coffee: 'bg-[#8a5637]/10 text-[#744326]',
    sage: 'bg-emerald-700/10 text-emerald-800',
    amber: 'bg-amber-600/15 text-amber-800',
    stone: 'bg-stone-700/10 text-stone-800',
  }

  return (
    <article className="rounded-3xl border border-white/75 bg-white/65 p-5 shadow-xl shadow-stone-900/5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
            {value}
          </p>
        </div>
        {Icon ? (
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tones[tone]}`}
          >
            <Icon />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-4 text-sm text-stone-500">{helper}</p> : null}
    </article>
  )
}

export default StatCard
