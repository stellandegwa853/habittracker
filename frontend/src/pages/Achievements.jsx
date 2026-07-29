import BadgeCard from '../components/BadgeCard'
import EmptyState from '../components/EmptyState'
import ProgressRing from '../components/ProgressRing'
import { useAppData } from '../context/useAppData'

function Achievements() {
  const { dashboard, habits, isLoading } = useAppData()
  const totalCompleted = dashboard?.total_completed ?? 0
  const longestStreak = dashboard?.longest_streak ?? 0
  const completedToday = dashboard?.completed_today ?? 0

  const achievements = [
    {
      id: 1,
      title: 'First Step',
      description: 'Create your first habit.',
      icon: '✦',
      earned: habits.length > 0,
      progress: habits.length > 0 ? 100 : 0,
      progressLabel: `${Math.min(habits.length, 1)}/1 habit`,
      requirement: '1 habit',
    },
    {
      id: 2,
      title: '7 Day Flow',
      description: 'Keep any habit alive for one full week.',
      icon: '7',
      earned: longestStreak >= 7,
      progress: Math.min(100, Math.round((longestStreak / 7) * 100)),
      progressLabel: `${Math.min(longestStreak, 7)}/7 days`,
      requirement: '7 day streak',
    },
    {
      id: 3,
      title: 'Morning Starter',
      description: 'Create or complete a morning habit.',
      icon: '☼',
      earned: habits.some((habit) => habit.timeOfDay === 'Morning'),
      progress: habits.some((habit) => habit.timeOfDay === 'Morning') ? 100 : 0,
      progressLabel: habits.some((habit) => habit.timeOfDay === 'Morning')
        ? 'Morning habit found'
        : '0 morning habits',
      requirement: 'Morning habit',
    },
    {
      id: 4,
      title: 'Comeback Day',
      description: 'Complete at least one habit today.',
      icon: '↺',
      earned: completedToday > 0,
      progress: completedToday > 0 ? 100 : 0,
      progressLabel: `${Math.min(completedToday, 1)}/1 today`,
      requirement: 'Complete today',
    },
    {
      id: 5,
      title: 'Consistency King',
      description: 'Reach a 30-day streak.',
      icon: '♛',
      earned: longestStreak >= 30,
      progress: Math.min(100, Math.round((longestStreak / 30) * 100)),
      progressLabel: `${Math.min(longestStreak, 30)}/30 days`,
      requirement: '30 day streak',
    },
    {
      id: 6,
      title: 'Quiet Discipline',
      description: 'Complete 100 habits.',
      icon: '◇',
      earned: totalCompleted >= 100,
      progress: Math.min(100, Math.round((totalCompleted / 100) * 100)),
      progressLabel: `${Math.min(totalCompleted, 100)}/100 done`,
      requirement: '100 completions',
    },
  ]

  const earnedCount = achievements.filter((badge) => badge.earned).length
  const nextBadge = achievements.find((badge) => !badge.earned) || achievements[0]

  if (isLoading) {
    return (
      <EmptyState
        title="Loading achievements"
        message="Checking which badges your habits have unlocked."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
          <p className="text-sm font-medium text-[#744326]">Achievements</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
            Habit badges
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Badges unlock from your habit count, completions, and streaks.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-5 shadow-sm shadow-stone-900/5">
          <p className="text-sm font-semibold text-[#744326]">Next badge</p>
          <h3 className="mt-2 text-2xl font-semibold text-stone-950">
            {nextBadge.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{nextBadge.requirement}</p>
          <div className="mt-4">
            <ProgressRing
              label={`${earnedCount}/${achievements.length} earned`}
              value={Math.round((earnedCount / achievements.length) * 100)}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {achievements.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </section>
    </div>
  )
}

export default Achievements
