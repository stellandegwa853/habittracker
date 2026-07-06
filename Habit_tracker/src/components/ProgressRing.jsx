function ProgressRing({ label = 'Complete', size = 108, value = 0 }) {
  const normalizedValue = Math.max(0, Math.min(100, value))

  return (
    <div className="flex items-center gap-4">
      <div
        className="grid shrink-0 place-items-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(#8a5637 ${normalizedValue}%, rgba(214, 201, 185, 0.65) 0)`,
        }}
      >
        <div className="grid h-[78%] w-[78%] place-items-center rounded-full bg-[#f8f3ec] shadow-inner">
          <span className="text-xl font-semibold text-stone-950">
            {normalizedValue}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <p className="mt-1 text-sm leading-6 text-stone-600">
          Keep the chain alive with one small check-in.
        </p>
      </div>
    </div>
  )
}

export default ProgressRing
