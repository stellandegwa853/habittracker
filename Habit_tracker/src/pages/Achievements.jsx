import BadgeCard from '../components/BadgeCard'
import ProgressRing from '../components/ProgressRing'
import { achievements } from '../utils/mockData'

function Achievements() {
  const earnedCount = achievements.filter((badge) => badge.earned).length

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <p className="text-sm font-medium text-[#744326]">Achievements</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
            Tiny proofs of progress
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            Badges for the ordinary wins: returning, restarting, and keeping a
            promise to yourself.
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

export default Achievements
