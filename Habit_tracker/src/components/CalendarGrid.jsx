function CalendarGrid({ days, onSelectDay, selectedDay }) {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="rounded-3xl border border-white/75 bg-white/70 p-4 shadow-xl shadow-stone-900/5 backdrop-blur sm:p-6">
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-stone-400">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {(days || []).map((day, index) => {
          if (day.empty) {
            return (
              <span
                key={`empty-${index}`}
                className="aspect-square rounded-2xl border border-transparent"
              />
            )
          }

          const isSelected = selectedDay?.day === day.day

          return (
            <button
              key={day.day}
              type="button"
              onClick={() => onSelectDay?.(day)}
              className={`aspect-square rounded-2xl border text-sm font-medium transition ${
                isSelected
                  ? 'border-[#8a5637] bg-[#8a5637] text-white shadow-lg shadow-[#8a5637]/20'
                  : day.today
                    ? 'border-amber-300 bg-amber-100 text-amber-900'
                    : day.completed
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
                      : day.missed
                        ? 'border-red-100 bg-red-50 text-red-700'
                        : 'border-stone-100 bg-white/70 text-stone-600 hover:border-stone-200'
              }`}
            >
              {day.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
