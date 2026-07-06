import BadgeCard from '../components/BadgeCard'
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
    },
    {
      id: 2,
      title: '7 Day Flow',
      description: 'Keep any habit alive for one full week.',
      icon: '7',
      earned: longestStreak >= 7,
    },
    {
      id: 3,
      title: 'Morning Starter',
      description: 'Create or complete a morning habit.',
      icon: '☼',
      earned: habits.some((habit) => habit.timeOfDay === 'Morning'),
    },
    {
      id: 4,
      title: 'Comeback Day',
      description: 'Complete at least one habit today.',
      icon: '↺',
      earned: completedToday > 0,
    },
    {
      id: 5,
      title: 'Consistency King',
      description: 'Reach a 30-day streak.',
      icon: '♛',
      earned: longestStreak >= 30,
    },
    {
      id: 6,
      title: 'Quiet Discipline',
      description: 'Complete 100 habits.',
      icon: '◇',
      earned: totalCompleted >= 100,
    },
  ]

  const earnedCount = achievements.filter((badge) => badge.earned).length

  if (isLoading) {
    return <StateCard message="Loading achievements..." />
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <p className="text-sm font-medium text-[#744326]">Achievements</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
            Tiny proofs of progress
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            These badges now respond to your real habit count, completions, and
            streaks.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
          <ProgressRing
            label="Next badge progress"
            value={Math.round((earnedCount / achievements.length) * 100)}
          />
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

function StateCard({ message }) {
  return (
    <section className="rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center text-stone-600 shadow-xl shadow-stone-900/5">
      {message}
    </section>
  )
}

export default Achievements
