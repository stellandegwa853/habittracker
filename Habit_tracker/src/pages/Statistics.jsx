import { FiAward, FiCheckCircle, FiTarget, FiTrendingUp } from 'react-icons/fi'
import StatCard from '../components/StatCard'
import { useAppData } from '../context/useAppData'

function Statistics() {
  const { dashboard, habits, isLoading, weeklyProgress } = useAppData()
  const mostConsistentHabit =
    habits.reduce(
      (best, habit) =>
        habit.completionRate > best.completionRate ? habit : best,
      habits[0] || { title: 'None yet', completionRate: 0, bestStreak: 0 },
    ) || {}

  const categoryBreakdown = habits.reduce((items, habit) => {
    const existing = items.find((item) => item.category === habit.category)

    if (existing) {
      existing.total += habit.completionRate
      existing.count += 1
      existing.value = Math.round(existing.total / existing.count)
      return items
    }

    return [
      ...items,
      {
        category: habit.category,
        total: habit.completionRate,
        count: 1,
        value: habit.completionRate,
      },
    ]
  }, [])

  if (isLoading) {
    return <StateCard message="Loading statistics..." />
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">
          Progress & Statistics
        </p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
          The quiet numbers
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          These numbers are calculated from your real habits and completion
          history.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FiTarget}
          label="Total habits"
          value={dashboard?.total_habits ?? habits.length}
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completion rate"
          tone="sage"
          value={`${Math.round(dashboard?.completion_rate ?? 0)}%`}
        />
        <StatCard
          icon={FiTrendingUp}
          label="Best streak"
          tone="amber"
          value={`${dashboard?.longest_streak ?? 0}d`}
        />
        <StatCard
          icon={FiAward}
          label="Most consistent"
          tone="stone"
          value={mostConsistentHabit.title}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Weekly progress
          </h3>
          <div className="mt-6 flex h-64 items-end gap-3">
            {weeklyProgress.map((day) => {
              const percent = day.total
                ? Math.round((day.completed / day.total) * 100)
                : 0

              return (
                <div key={day.date || day.day} className="flex flex-1 flex-col items-center">
                  <div className="flex h-48 w-full items-end rounded-t-3xl bg-stone-100">
                    <div
                      className="w-full rounded-t-3xl bg-[#8a5637]"
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-stone-500">
                    {day.day}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Category breakdown
          </h3>
          <div className="mt-6 space-y-4">
            {categoryBreakdown.length ? (
              categoryBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {item.category}
                    </span>
                    <span className="text-stone-500">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-[#8a5637]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">
                Create habits to see category trends.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Habit performance
          </h3>
          <div className="mt-5 space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between rounded-2xl bg-white/75 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{habit.title}</p>
                  <p className="text-sm text-stone-500">{habit.category}</p>
                </div>
                <span className="font-semibold text-[#744326]">
                  {habit.completionRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-amber-100 bg-amber-50/80 p-6 shadow-xl shadow-stone-900/5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-800/70">
            Insight
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-950">
            Your strongest habit is {mostConsistentHabit.title}.
          </h3>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Use that routine as an anchor for the next small habit you add.
          </p>
        </aside>
      </section>
    </div>
  )
}

function StateCard({ message }) {
  return (
    <section className="rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center text-stone-600 shadow-xl shadow-stone-900/5">
      {message}
    </section>
  )
}

export default Statistics
