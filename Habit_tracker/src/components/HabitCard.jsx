import { Link } from 'react-router-dom'
import { FiCheck, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import ProgressRing from './ProgressRing'

function HabitCard({ habit, onDelete, onMarkDone, showActions = true }) {
  if (!habit) {
    return null
  }

  const currentStreak = formatDays(habit.currentStreak)
  const bestStreak = formatDays(habit.bestStreak)
  const completionButtonLabel = habit.completedToday
    ? 'Completed'
    : 'Mark Complete'

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-white/75 bg-[#fffaf4]/78 shadow-sm shadow-stone-900/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/8">
      <div className="h-1 bg-[#8a5637]/70" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="whitespace-nowrap rounded-full border border-[#8a5637]/10 bg-[#8a5637]/8 px-3 py-1 text-xs font-medium text-[#744326]">
                  {habit.category}
                </span>
                <span className="whitespace-nowrap rounded-full border border-stone-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-stone-500">
                  {habit.timeOfDay}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-normal text-stone-950">
                {habit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {habit.description}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                habit.completedToday
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80'
                  : 'bg-amber-100 text-amber-800 ring-1 ring-amber-200/80'
              }`}
            >
              {habit.completedToday ? 'Done' : 'Open'}
            </span>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Frequency" value={habit.frequency} />
            <Info label="Streak" value={currentStreak} />
            <Info label="Best" value={bestStreak} />
            <Info label="Mood" value={habit.moodTag} />
          </div>

          <div className="rounded-[1.15rem] border border-stone-200/60 bg-white/58 p-4">
            <ProgressRing
              label="Habit rhythm"
              size={76}
              value={habit.completionRate}
            />
          </div>

          {showActions ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-stone-200/60 pt-4">
              <button
                type="button"
                disabled={habit.completedToday}
                onClick={() => onMarkDone?.(habit.id)}
                className="inline-flex items-center gap-2 rounded-full bg-[#8a5637] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#8a5637]/20 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30 disabled:cursor-not-allowed disabled:bg-emerald-100 disabled:text-emerald-800 disabled:shadow-none"
              >
                <FiCheck />
                {completionButtonLabel}
              </button>
              <Link
                to={`/habits/${habit.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-stone-950"
              >
                <FiEye />
                View Progress
              </Link>
              <Link
                to={`/habits/${habit.id}/edit`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-stone-950"
              >
                <FiEdit3 />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete?.(habit.id)}
                className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/80 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function Info({ label, value }) {
  return (
    <div className="flex min-h-20 flex-col justify-center rounded-[1rem] border border-stone-200/60 bg-white/58 px-4 py-3">
      <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.06em] text-stone-400">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold leading-5 text-stone-800">
        {value}
      </p>
    </div>
  )
}

function formatDays(value = 0) {
  const days = Number(value) || 0
  return `${days} ${days === 1 ? 'day' : 'days'}`
}

export default HabitCard
