import { Link } from 'react-router-dom'
import { FiCheck, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import ProgressRing from './ProgressRing'

function HabitCard({ habit, onDelete, onMarkDone, showActions = true }) {
  if (!habit) {
    return null
  }

  return (
    <article className="rounded-3xl border border-white/75 bg-white/70 p-5 shadow-xl shadow-stone-900/5 backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#8a5637]/10 px-3 py-1 text-xs font-medium text-[#744326]">
                {habit.category}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
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
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              habit.completedToday
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {habit.completedToday ? 'Done' : 'Open'}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Info label="Frequency" value={habit.frequency} />
            <Info label="Current streak" value={`${habit.currentStreak} days`} />
            <Info label="Best streak" value={`${habit.bestStreak} days`} />
            <Info label="Mood tag" value={habit.moodTag} />
          </div>
          <ProgressRing label="Habit rhythm" size={86} value={habit.completionRate} />
        </div>

        {showActions ? (
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              to={`/habits/${habit.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-950"
            >
              <FiEye />
              View
            </Link>
            <Link
              to={`/habits/${habit.id}/edit`}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-950"
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
            <button
              type="button"
              onClick={() => onMarkDone?.(habit.id)}
              className="inline-flex items-center gap-2 rounded-full bg-[#8a5637] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#744326]"
            >
              <FiCheck />
              Mark Done
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-stone-50/80 px-3 py-2">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="mt-1 font-medium text-stone-800">{value}</p>
    </div>
  )
}

export default HabitCard
