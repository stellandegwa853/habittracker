import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'
import HabitCard from '../components/HabitCard'
import { categories, habits as habitSeed } from '../utils/mockData'

function Habits() {
  const [habits, setHabits] = useState(habitSeed)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory = category === 'All' || habit.category === category
      const matchesQuery =
        habit.title.toLowerCase().includes(query.toLowerCase()) ||
        habit.description.toLowerCase().includes(query.toLowerCase())

      return matchesCategory && matchesQuery
    })
  }, [category, habits, query])

  function handleDelete(habitId) {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    )
  }

  function handleMarkDone(habitId) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completedToday: true } : habit,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#744326]">My Habits</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
            Keep the chain alive
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            A soft place for the routines you&apos;re practicing, rebuilding,
            and slowly making yours.
          </p>
        </div>
        <Link
          to="/habits/create"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#8a5637]/15 transition hover:bg-[#744326]"
        >
          <FiPlus />
          Add Habit
        </Link>
      </section>

      <section className="rounded-3xl border border-white/75 bg-white/65 p-4 shadow-xl shadow-stone-900/5 backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-500">
            <FiSearch />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search habits"
              className="w-full bg-transparent text-stone-800 outline-none placeholder:text-stone-400"
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? 'bg-[#8a5637] text-white'
                    : 'bg-white/75 text-stone-600 hover:text-stone-950'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onDelete={handleDelete}
            onMarkDone={handleMarkDone}
          />
        ))}
      </section>
    </div>
  )
}

export default Habits
