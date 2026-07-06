import { useMemo, useState } from 'react'
import CalendarGrid from '../components/CalendarGrid'
import { useAppData } from '../context/useAppData'
import { buildCalendarDays, getTodayDate } from '../utils/habitTransforms'

function Calendar() {
  const { habits, isLoading } = useAppData()
  const days = useMemo(() => buildCalendarDays(habits), [habits])
  const [selectedDay, setSelectedDay] = useState(null)
  const today = days.find((day) => day.date === getTodayDate())
  const activeDay = selectedDay || today || days.find((day) => !day.empty)

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">Habit Calendar</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
          This month&apos;s rhythm
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Completed days are pulled from the backend completion history for your
          habits.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {isLoading ? (
          <StateCard message="Loading calendar..." />
        ) : (
          <CalendarGrid
            days={days}
            selectedDay={activeDay}
            onSelectDay={setSelectedDay}
          />
        )}

        <aside className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <h3 className="text-xl font-semibold text-stone-950">
            {activeDay?.date || 'Selected day'}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
            <Legend color="bg-emerald-100 text-emerald-800" label="Completed" />
            <Legend color="bg-red-50 text-red-700" label="Missed" />
            <Legend color="bg-amber-100 text-amber-900" label="Today" />
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-stone-500">
              Completed habits
            </p>
            <div className="mt-3 space-y-3">
              {activeDay?.habits?.length ? (
                activeDay.habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="rounded-2xl bg-white/75 px-4 py-3"
                  >
                    <p className="font-medium text-stone-900">{habit.title}</p>
                    <p className="mt-1 text-sm text-stone-500">
                      {habit.category} · {habit.timeOfDay}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-stone-50 px-4 py-4 text-sm text-stone-500">
                  No completions on this day yet.
                </p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

function Legend({ color, label }) {
  return <span className={`rounded-full px-3 py-1 ${color}`}>{label}</span>
}

function StateCard({ message }) {
  return (
    <section className="rounded-3xl border border-white/75 bg-white/65 p-8 text-center text-stone-600 shadow-xl shadow-stone-900/5">
      {message}
    </section>
  )
}

export default Calendar
