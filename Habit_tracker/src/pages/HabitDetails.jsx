import { Link, useLocation, useParams } from 'react-router-dom'
import CalendarGrid from '../components/CalendarGrid'
import EmptyState from '../components/EmptyState'
import ProgressRing from '../components/ProgressRing'
import StatCard from '../components/StatCard'
import { useAppData } from '../context/useAppData'
import { buildCalendarDays } from '../utils/habitTransforms'

function HabitDetails() {
  const { id } = useParams()
  const location = useLocation()
  const { habits, isLoading, weeklyProgress } = useAppData()
  const habit = habits.find((item) => String(item.id) === id)
  const miniDays = buildCalendarDays(habit ? [habit] : []).slice(0, 21)
  const notice = location.state?.notice

  if (isLoading) {
    return (
      <EmptyState
        title="Loading habit details"
        message="Getting the latest progress for this habit."
      />
    )
  }

  if (!habit) {
    return (
      <EmptyState
        actionLabel="Back to habits"
        actionTo="/habits"
        icon="!"
        title="Habit not found"
        message="That habit could not be found in your saved list."
        tone="warning"
      />
    )
  }

  return (
    <div className="space-y-6">
      {notice ? (
        <p
          role="status"
          className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {notice}
        </p>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <span className="rounded-full bg-[#8a5637]/10 px-4 py-2 text-sm font-medium text-[#744326]">
            {habit.category}
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-normal text-stone-950">
            {habit.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600">
            {habit.description || 'No description yet.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/habits/${habit.id}/edit`}
              className="rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/15 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30"
            >
              Edit habit
            </Link>
            <Link
              to="/habits"
              className="rounded-full border border-stone-200 bg-white/75 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white"
            >
              Back to habits
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
          <ProgressRing label="Completion rate" value={habit.completionRate} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Streak" value={`${habit.currentStreak}d`} />
        <StatCard label="Best" value={`${habit.bestStreak}d`} tone="amber" />
        <StatCard label="Frequency" value={habit.frequency} tone="stone" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/75 bg-white/65 p-5 shadow-xl shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Weekly activity
          </h3>
          <div className="mt-5 space-y-3">
            {weeklyProgress.map((day) => {
              const completed = habit.completionDates.includes(day.date) ? 1 : 0

              return (
                <div key={day.date}>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>{day.day}</span>
                    <span>{completed}/1</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-[#8a5637]"
                      style={{ width: completed ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <CalendarGrid days={miniDays} />
      </section>

      <section className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
        <h3 className="text-xl font-semibold text-stone-950">
          Notes and reminder
        </h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Reminder set for {habit.reminderTime || 'no time yet'}. Keep this
          habit light enough to repeat on an ordinary day.
        </p>
      </section>
    </div>
  )
}

export default HabitDetails
