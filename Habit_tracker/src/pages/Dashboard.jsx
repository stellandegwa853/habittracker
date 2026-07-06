import { useState } from 'react'
import {
  FiActivity,
  FiCheckCircle,
  FiRefreshCw,
  FiTrendingUp,
} from 'react-icons/fi'
import HabitCard from '../components/HabitCard'
import ProgressRing from '../components/ProgressRing'
import StatCard from '../components/StatCard'
import { useAppData } from '../context/useAppData'
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

  if (isLoading) {
    return <StateCard message="Loading your VibeCheck dashboard..." />
  }

  if (error) {
    return <StateCard message={error} />
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

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur sm:p-8">
          <span className="inline-flex rounded-full bg-[#8a5637]/10 px-4 py-2 text-sm font-medium text-[#744326]">
            Today&apos;s Vibe: {selectedMood}
          </span>
          <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl">
            Good to see you back{profile?.first_name ? `, ${profile.first_name}` : ''}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
            Small steps today. Better habits tomorrow. You do not need a perfect
            day, just one honest check-in.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/75 bg-[#8a5637] p-6 text-white shadow-xl shadow-[#8a5637]/20">
          <p className="text-sm font-medium text-white/75">Today&apos;s focus</p>
          {focusHabit ? (
            <>
              <h3 className="mt-3 text-2xl font-semibold">{focusHabit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
                {focusHabit.description || 'One small repeat is enough.'}
              </p>
              <div className="mt-6 rounded-3xl bg-white/12 p-4">
                <p className="text-sm text-white/70">Keep the chain alive</p>
                <p className="mt-1 text-3xl font-semibold">
                  {focusHabit.currentStreak} days
                </p>
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/75">
              Create your first habit to choose a focus for today.
            </p>
          )}
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
        <div className="rounded-3xl border border-white/75 bg-white/65 p-5 shadow-xl shadow-stone-900/5 backdrop-blur">
          <h3 className="text-xl font-semibold text-stone-950">
            Daily Vibe Check
          </h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Pick the energy you&apos;re carrying into today.
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

          <div className="mt-6 rounded-3xl bg-stone-50/80 p-5">
            <ProgressRing label="Today completion" value={completionRate} />
          </div>
        </div>

        <div className="rounded-3xl border border-white/75 bg-white/65 p-5 shadow-xl shadow-stone-900/5 backdrop-blur">
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
        </div>
        {todayHabits.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onMarkDone={completeHabitRecord}
              />
            ))}
          </div>
        ) : (
          <StateCard message="No habits yet. Create one to start your rhythm." />
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

function StateCard({ message }) {
  return (
    <section className="rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center text-stone-600 shadow-xl shadow-stone-900/5 backdrop-blur">
      {message}
    </section>
  )
}

export default Dashboard
