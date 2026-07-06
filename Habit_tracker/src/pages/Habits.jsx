import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'
import HabitCard from '../components/HabitCard'
import { useAppData } from '../context/useAppData'
import { categories } from '../utils/mockData'

function Habits() {
  const {
    completeHabitRecord,
    deleteHabitRecord,
    error,
    habits,
    isLoading,
  } = useAppData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState('')

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory = category === 'All' || habit.category === category
      const matchesQuery =
        habit.title.toLowerCase().includes(query.toLowerCase()) ||
        habit.description.toLowerCase().includes(query.toLowerCase())

      return matchesCategory && matchesQuery
    })
  }, [category, habits, query])

  async function handleDelete(habitId) {
    await deleteHabitRecord(habitId)
    setNotice('Habit deleted.')
  }

  async function handleMarkDone(habitId) {
    try {
      await completeHabitRecord(habitId)
      setNotice('Habit marked done.')
    } catch {
      setNotice('That habit is already complete today.')
    }
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
            Your real habits from Django, filtered gently on the frontend.
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

      {error || notice ? (
        <p className="rounded-2xl border border-white/75 bg-white/65 px-4 py-3 text-sm text-stone-600 shadow-sm">
          {error || notice}
        </p>
      ) : null}

      {isLoading ? (
        <StateCard message="Loading habits..." />
      ) : filteredHabits.length ? (
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
      ) : (
        <StateCard message="No habits found. Add one to start the chain." />
      )}
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

export default Habits
