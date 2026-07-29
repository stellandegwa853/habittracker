import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiCheck,
  FiChevronDown,
  FiEdit3,
  FiEye,
  FiTrash2,
} from 'react-icons/fi'
import ConfirmModal from './ConfirmModal'
import HabitTimer from './HabitTimer'
import ProgressRing from './ProgressRing'
import { formatDuration } from '../utils/habitTransforms'

function HabitCard({
  allowTimerControls = true,
  defaultExpanded = false,
  habit,
  onDelete,
  onMarkDone,
  onNotice,
  showActions = true,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  if (!habit) {
    return null
  }

  const currentStreak = formatDays(habit.currentStreak)
  const bestStreak = formatDays(habit.bestStreak)
  const isTimeGoal = habit.goalType === 'time'
  const statusLabel = habit.completedToday ? 'Completed Today' : 'Pending'
  const completionButtonLabel = habit.completedToday
    ? 'Completed Today'
    : 'Complete Today'
  const goalSummary = isTimeGoal
    ? `${formatDuration(habit.targetDurationSeconds)} session`
    : 'Simple'
  const hasTimer = isTimeGoal && habit.timerEnabled
  const showTimer = allowTimerControls && hasTimer

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-white/75 bg-[#fffaf4]/82 shadow-sm shadow-stone-900/5 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/8">
      <div className="h-1 bg-[#8a5637]/70" />
      <div className="p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,auto)] md:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="whitespace-nowrap rounded-full border border-[#8a5637]/10 bg-[#8a5637]/8 px-3 py-1 text-xs font-medium text-[#744326]">
                {habit.category}
              </span>
              <span className="whitespace-nowrap rounded-full border border-stone-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-stone-500">
                {habit.timeOfDay}
              </span>
              <span className="whitespace-nowrap rounded-full border border-stone-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-stone-600">
                {goalSummary}
              </span>
              {hasTimer ? (
                <span className="whitespace-nowrap rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Timer on
                </span>
              ) : null}
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                  habit.completedToday
                    ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80'
                    : 'bg-amber-100 text-amber-800 ring-1 ring-amber-200/80'
                }`}
              >
                {statusLabel}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-normal text-stone-950">
              {habit.title}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {isTimeGoal
                ? `${goalSummary} · ${currentStreak} streak`
                : `${currentStreak} streak · ${habit.frequency}`}
            </p>
          </div>

          {showActions ? (
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {showTimer ? (
                <div className="w-full md:w-[24rem] md:max-w-full">
                  <HabitTimer
                    key={`${habit.id}-${habit.targetDurationSeconds}-${habit.completedToday}`}
                    compact={!isExpanded}
                    habit={habit}
                    onComplete={onMarkDone}
                    onNotice={onNotice}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  disabled={habit.completedToday}
                  onClick={() => onMarkDone?.(habit.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8a5637] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#8a5637]/20 transition duration-200 hover:bg-[#744326] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30 disabled:cursor-not-allowed disabled:bg-emerald-100 disabled:text-emerald-800 disabled:shadow-none"
                >
                  <FiCheck />
                  {completionButtonLabel}
                </button>
              )}
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-4 py-2 text-sm font-semibold text-stone-700 transition duration-200 hover:border-stone-300 hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-300"
              >
                Details
                <FiChevronDown
                  className={`transition duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          ) : null}
        </div>

        <div
          className={`grid transition-all duration-300 ease-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-5 border-t border-stone-200/60 pt-5">
              <p className="text-sm leading-6 text-stone-600">
                {habit.description || 'No description added yet.'}
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <Info label="Frequency" value={habit.frequency} />
                <Info label="Streak" value={currentStreak} />
                <Info label="Best streak" value={bestStreak} />
                <Info label="Target" value={goalSummary} />
                <Info
                  label="Timer"
                  value={
                    isTimeGoal
                      ? habit.timerEnabled
                        ? 'On'
                        : 'Off'
                      : 'Not needed'
                  }
                />
                <Info label="Mood" value={habit.moodTag} />
              </div>

              {habit.goal ? (
                <div className="mt-4 rounded-[1rem] border border-stone-200/60 bg-white/58 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-400">
                    Goal note
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {habit.goal}
                  </p>
                </div>
              ) : null}

              <div className="mt-4 rounded-[1.15rem] border border-stone-200/60 bg-white/58 p-4">
                <ProgressRing
                  label="Habit rhythm"
                  size={72}
                  value={habit.completionRate}
                />
              </div>

              {showActions ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    to={`/habits/${habit.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition duration-200 hover:border-stone-300 hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-300"
                  >
                    <FiEye />
                    View Progress
                  </Link>
                  <Link
                    to={`/habits/${habit.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 transition duration-200 hover:border-stone-300 hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-300"
                  >
                    <FiEdit3 />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsConfirmingDelete(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/80 px-4 py-2 text-sm font-medium text-red-700 transition duration-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmingDelete}
        title="Delete habit?"
        message={`This will remove "${habit.title}" and its progress history from your account.`}
        confirmLabel="Delete habit"
        tone="danger"
        onCancel={() => setIsConfirmingDelete(false)}
        onConfirm={() => {
          setIsConfirmingDelete(false)
          onDelete?.(habit.id)
        }}
      />
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
