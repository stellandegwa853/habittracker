function BadgeCard({ badge }) {
  if (!badge) {
    return null
  }

  return (
    <article
      className={`rounded-[1.2rem] border p-4 shadow-sm shadow-stone-900/5 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/8 ${
        badge.earned
          ? 'border-white/75 bg-[#fffaf4]/80'
          : 'border-stone-200/70 bg-white/55'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-[1rem] text-lg font-semibold shadow-sm ${
            badge.earned
              ? 'bg-[#8a5637] text-white ring-4 ring-[#8a5637]/10'
              : 'bg-stone-200/80 text-stone-600'
          }`}
        >
          {badge.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-stone-950">
            {badge.title}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-stone-400">
            {badge.requirement}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        {badge.description}
      </p>
      <div className="mt-4 h-2 rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            badge.earned ? 'bg-emerald-600' : 'bg-[#8a5637]'
          }`}
          style={{ width: `${Math.min(100, badge.progress || 0)}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold">
        <span className={badge.earned ? 'text-emerald-800' : 'text-stone-500'}>
          {badge.earned ? 'Earned' : 'Locked'}
        </span>
        <span className="text-stone-500">{badge.progressLabel}</span>
      </div>
    </article>
  )
}

export default BadgeCard
