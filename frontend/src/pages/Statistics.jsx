import { FiAward, FiCheckCircle, FiTarget, FiTrendingUp } from 'react-icons/fi'
import EmptyState from '../components/EmptyState'
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
  const mostMissedHabit =
    habits.reduce(
      (lowest, habit) =>
        habit.completionRate < lowest.completionRate ? habit : lowest,
      habits[0] || { title: 'None yet', completionRate: 100 },
    ) || {}
  const bestTimeOfDay =
    Object.entries(
      habits.reduce((items, habit) => {
        items[habit.timeOfDay] = (items[habit.timeOfDay] || 0) + habit.completionRate
        return items
      }, {}),
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Not enough data'
  const totalCompletions = dashboard?.total_completed ?? 0
  const hasUsefulData = habits.length > 0 && totalCompletions > 0

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
    return (
      <EmptyState
        title="Loading statistics"
        message="Crunching your habit progress from the backend."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">
          Progress & Statistics
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
          Progress overview
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Based on your saved habits and completion history.
        </p>
      </section>

      {!hasUsefulData ? (
        <EmptyState
          actionLabel="Track a habit"
          actionTo="/habits"
          title="Insights need a little more history"
          message="Complete habits for a few days to unlock more useful weekly patterns."
        />
      ) : null}

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
          label="Current streak"
          tone="amber"
          value={`${dashboard?.current_streak ?? 0}d`}
        />
        <StatCard
          icon={FiAward}
          label="Most consistent"
          tone="stone"
          value={mostConsistentHabit.title}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Weekly progress
          </h3>
          <div className="mt-6 flex h-56 items-end gap-3">
            {weeklyProgress.map((day) => {
              const percent = day.total
                ? Math.round((day.completed / day.total) * 100)
                : 0

              return (
                <div key={day.date || day.day} className="flex flex-1 flex-col items-center">
                  <div className="flex h-40 w-full items-end rounded-t-3xl bg-stone-100">
                    <div
                      className="w-full rounded-t-3xl bg-[#8a5637] transition-all duration-700"
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-stone-700">
                    {day.completed}/{day.total}
                  </p>
                  <p className="mt-3 text-xs font-medium text-stone-500">
                    {day.day}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5">
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
        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">
            Habit performance
          </h3>
          <div className="mt-5 space-y-3">
            {habits.length ? habits.map((habit) => (
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
            )) : (
              <p className="rounded-2xl bg-stone-50 px-4 py-4 text-sm text-stone-500">
                Create habits to compare performance here.
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-3 rounded-[1.5rem] border border-amber-100 bg-amber-50/80 p-6 shadow-sm shadow-stone-900/5">
          <h3 className="text-xl font-semibold text-stone-950">Insights</h3>
          <Insight label="Strongest habit" value={mostConsistentHabit.title} />
          <Insight label="Needs attention" value={mostMissedHabit.title} />
          <Insight label="Best time of day" value={bestTimeOfDay} />
        </aside>
      </section>
    </div>
  )
}

function Insight({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-800/70">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-stone-900">{value}</p>
    </div>
  )
}

export default Statistics
