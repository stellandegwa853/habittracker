function BadgeCard({ badge }) {
  if (!badge) {
    return null
  }

  return (
    <article
      className={`rounded-3xl border p-5 shadow-xl shadow-stone-900/5 backdrop-blur ${
        badge.earned
          ? 'border-white/75 bg-white/75'
          : 'border-stone-200/70 bg-white/35'
      }`}
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-2xl text-xl font-semibold ${
          badge.earned
            ? 'bg-[#8a5637] text-white'
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
