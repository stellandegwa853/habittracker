import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiActivity,
  FiCheckCircle,
  FiPlus,
  FiRefreshCw,
  FiTrendingUp,
} from 'react-icons/fi'
import EmptyState from '../components/EmptyState'
import HabitCard from '../components/HabitCard'
import HabitTimer from '../components/HabitTimer'
import StatCard from '../components/StatCard'
import { useAppData } from '../context/useAppData'
import { formatDuration } from '../utils/habitTransforms'
import { moodOptions } from '../utils/mockData'

function Dashboard() {
  const {
    completeHabitRecord,
    dashboard,
    error,
    habits,
    isLoading,
    profile,
    weeklyProgress,
  } = useAppData()
  const [selectedMood, setSelectedMood] = useState('Calm')
  const [notice, setNotice] = useState('')

  if (isLoading) {
    return (
      <EmptyState
        title="Loading dashboard"
        message="Getting your habits, streaks, and today's progress ready."
      />
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="!"
        title="Could not load dashboard"
        message={error}
        tone="warning"
      />
    )
  }

  const completedToday =
    dashboard?.completed_today ??
    habits.filter((habit) => habit.completedToday).length
  const habitsToday = dashboard?.total_habits ?? habits.length
  const completionRate = Math.round(dashboard?.completion_rate ?? 0)
  const currentStreak = dashboard?.current_streak ?? 0
  const todayHabits = habits.slice(0, 4)
  const focusHabit =
    habits.find((habit) => !habit.completedToday) || habits[0] || null
  const focusIsTimed = focusHabit?.goalType === 'time'
  const focusUsesTimer = focusIsTimed && focusHabit?.timerEnabled
  const allDone = habits.length > 0 && completedToday >= habitsToday
  const moodAdvice =
    {
      Focused: 'Use the energy for one important habit first.',
      Tired: 'Choose the lightest version that still counts.',
      Motivated: 'Complete one habit, then decide if you want another.',
      Calm: 'Keep the pace steady and simple.',
      Reset: 'Restart with one easy check-in today.',
    }[selectedMood] || 'Pick one habit and complete it today.'

  async function handleFocusComplete() {
    if (!focusHabit || focusHabit.completedToday) {
      return
    }

    try {
      await completeHabitRecord(focusHabit.id)
      setNotice(`${focusHabit.title} completed for today.`)
    } catch {
      setNotice('That habit could not be completed right now.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.7rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5 backdrop-blur sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#744326]">
                Today&apos;s check-in
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
                {allDone ? 'All habits complete' : 'Complete the next habit'}
              </h2>
            </div>
            <span className="rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-stone-700">
              {completedToday}/{habitsToday || 0} complete
            </span>
          </div>

          {focusHabit ? (
            <div className="mt-6 rounded-[1.25rem] border border-stone-200/70 bg-white/68 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-400">
                    {focusHabit.category} · {focusHabit.timeOfDay}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-stone-950">
                    {focusHabit.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    {focusIsTimed
                      ? `${formatDuration(
                          focusHabit.targetDurationSeconds,
                        )} ${focusHabit.timeOfDay.toLowerCase()} session`
                      : `${focusHabit.currentStreak} day streak · ${focusHabit.frequency}`}
                  </p>
                </div>
                {focusUsesTimer ? (
                  <div className="w-full sm:max-w-md">
                    <HabitTimer
                      key={`${focusHabit.id}-${focusHabit.targetDurationSeconds}-${focusHabit.completedToday}`}
                      habit={focusHabit}
                      onComplete={completeHabitRecord}
                      onNotice={setNotice}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={focusHabit.completedToday}
                    onClick={handleFocusComplete}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/15 transition duration-200 hover:bg-[#744326] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30 disabled:cursor-not-allowed disabled:bg-emerald-100 disabled:text-emerald-800 disabled:shadow-none"
                  >
                    <FiCheckCircle />
                    {focusHabit.completedToday
                      ? 'Completed Today'
                      : 'Complete Today'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              actionLabel="Create your first habit"
              actionTo="/habits/create"
              title="No habits yet"
              message="Start with one habit. The dashboard will become more useful after your first check-in."
            />
          )}

          {notice ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {notice}
            </p>
          ) : null}
        </div>

        <div className="rounded-[1.7rem] border border-white/75 bg-[#8a5637] p-6 text-white shadow-lg shadow-[#8a5637]/15">
          <p className="text-sm font-medium text-white/75">
            Good to see you back{profile?.first_name ? `, ${profile.first_name}` : ''}
          </p>
          <h3 className="mt-3 text-3xl font-semibold">
            {completionRate}% done today
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/75">
            {allDone
              ? "You have finished today's list."
              : `${Math.max(habitsToday - completedToday, 0)} habit${
                  habitsToday - completedToday === 1 ? '' : 's'
                } left to check in.`}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/habits/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#744326] transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/45"
            >
              <FiPlus />
              Create Habit
            </Link>
            <Link
              to="/habits"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Habits
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FiActivity}
          label="Habits today"
          value={habitsToday}
          helper="A full but gentle list."
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completed"
          tone="sage"
          value={completedToday}
          helper="Small wins already banked."
        />
        <StatCard
          icon={FiTrendingUp}
          label="Current streak"
          tone="amber"
          value={`${currentStreak}d`}
          helper="Quiet discipline in motion."
        />
        <StatCard
          icon={FiRefreshCw}
          label="Today completion"
          tone="stone"
          value={`${completionRate}%`}
          helper="Your daily rhythm."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
          <h3 className="text-xl font-semibold text-stone-950">
            Daily Vibe Check
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Pick today&apos;s energy. This changes the suggestion below.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedMood === mood
                    ? 'bg-[#8a5637] text-white shadow-lg shadow-[#8a5637]/20'
                    : 'bg-white/75 text-stone-600 hover:bg-white hover:text-stone-950'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.15rem] border border-stone-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-stone-900">
              {selectedMood} suggestion
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              {moodAdvice}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
          <h3 className="text-xl font-semibold text-stone-950">
            Weekly progress
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            A calm look at your last seven days.
          </p>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {weeklyProgress.map((day) => {
              const percent = day.total
                ? Math.round((day.completed / day.total) * 100)
                : 0

              return (
                <div key={day.date || day.day} className="text-center">
                  <div className="mx-auto flex h-24 w-full max-w-12 items-end rounded-full bg-stone-100 p-1">
                    <div
                      className={`w-full rounded-full ${
                        day.active ? 'bg-[#8a5637]' : 'bg-stone-300'
                      }`}
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-stone-500">
                    {day.day}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-stone-950">
              Today&apos;s habits
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Mark what you can. Let the rest wait its turn.
            </p>
          </div>
          <Link
            to="/habits/create"
            className="hidden rounded-full border border-stone-200 bg-white/75 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-white sm:inline-flex"
          >
            Add Habit
          </Link>
        </div>
        {todayHabits.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                allowTimerControls={false}
                habit={habit}
                onMarkDone={completeHabitRecord}
                onNotice={setNotice}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            actionLabel="Create your first habit"
            actionTo="/habits/create"
            title="No habits yet"
            message="Start with one small habit. After that, your dashboard will show progress and streaks here."
          />
        )}
      </section>

      <section className="rounded-[2rem] border border-amber-100 bg-amber-50/80 p-6 shadow-xl shadow-stone-900/5">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-800/70">
          Gentle reminder
        </p>
        <p className="mt-3 text-2xl font-semibold text-stone-950">
          Do not chase perfect. Just show up once today.
        </p>
      </section>
    </div>
  )
}

export default Dashboard
