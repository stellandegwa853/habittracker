function BadgeCard({ badge }) {
  if (!badge) {
    return null
  }

  return (
    <article
      className={`rounded-[1.4rem] border p-5 shadow-sm shadow-stone-900/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/8 ${
        badge.earned
          ? 'border-white/75 bg-[#fffaf4]/80'
          : 'border-stone-200/70 bg-white/40'
      }`}
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-[1.1rem] text-xl font-semibold shadow-sm ${
          badge.earned
            ? 'bg-[#8a5637] text-white ring-4 ring-[#8a5637]/10'
            : 'bg-stone-200/70 text-stone-500'
        }`}
      >
        {badge.icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-stone-950">
        {badge.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        {badge.description}
      </p>
      <span
        className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
          badge.earned
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-stone-100 text-stone-500'
        }`}
      >
        {badge.earned ? 'Earned' : 'Locked'}
      </span>
    </article>
  )
}

export default BadgeCard
