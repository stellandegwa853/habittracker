import { useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import CalendarGrid from '../components/CalendarGrid'
import EmptyState from '../components/EmptyState'
import { useAppData } from '../context/useAppData'
import { buildCalendarDays, getTodayDate } from '../utils/habitTransforms'

function Calendar() {
  const { habits, isLoading } = useAppData()
  const [monthDate, setMonthDate] = useState(new Date())
  const days = useMemo(() => buildCalendarDays(habits, monthDate), [habits, monthDate])
  const [selectedDay, setSelectedDay] = useState(null)
  const today = days.find((day) => day.date === getTodayDate())
  const activeDay = selectedDay || today || days.find((day) => !day.empty)
  const monthLabel = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(monthDate)
  const missedHabits =
    activeDay?.date && activeDay.date < getTodayDate()
      ? habits.filter(
          (habit) =>
            !activeDay.habits?.some((completedHabit) => completedHabit.id === habit.id),
        )
      : []

  function moveMonth(offset) {
    setSelectedDay(null)
    setMonthDate((currentDate) => {
      const nextDate = new Date(currentDate)
      nextDate.setMonth(currentDate.getMonth() + offset)
      return nextDate
    })
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#744326]">Habit Calendar</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
            Habit history
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Select a day to see what was completed.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 p-1">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            className="rounded-full p-2 text-stone-600 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#8a5637]/25"
            aria-label="Previous month"
          >
            <FiChevronLeft />
          </button>
          <span className="min-w-36 text-center text-sm font-semibold text-stone-800">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            className="rounded-full p-2 text-stone-600 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#8a5637]/25"
            aria-label="Next month"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {isLoading ? (
          <EmptyState
            title="Loading calendar"
            message="Building your month view from saved habit completions."
          />
        ) : (
          <CalendarGrid
            days={days}
            selectedDay={activeDay}
            onSelectDay={setSelectedDay}
          />
        )}

        <aside
          key={activeDay?.date || 'empty'}
          className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5 backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-stone-950">
            {activeDay?.date || 'Selected day'}
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            {activeDay?.completionRate ?? 0}% completion
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
            <Legend color="bg-emerald-100 text-emerald-800" label="Completed" />
            <Legend color="bg-[#8a5637]/10 text-[#744326]" label="Partial" />
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
          {missedHabits.length ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-stone-500">
                Not completed
              </p>
              <div className="mt-3 space-y-2">
                {missedHabits.slice(0, 4).map((habit) => (
                  <p
                    key={habit.id}
                    className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {habit.title}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  )
}

function Legend({ color, label }) {
  return <span className={`rounded-full px-3 py-1 ${color}`}>{label}</span>
}

export default Calendar
