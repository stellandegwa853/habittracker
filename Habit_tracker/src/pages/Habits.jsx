import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'
import EmptyState from '../components/EmptyState'
import HabitCard from '../components/HabitCard'
import { useAppData } from '../context/useAppData'
import { getApiErrorMessage } from '../utils/errorMessages'
import { categories } from '../utils/mockData'

function Habits() {
  const {
    completeHabitRecord,
    deleteHabitRecord,
    error,
    habits,
    isLoading,
  } = useAppData()
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [notice, setNotice] = useState(location.state?.notice || '')

  useEffect(() => {
    if (location.state?.notice) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.pathname, location.state?.notice, navigate])

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
    try {
      await deleteHabitRecord(habitId)
      setNotice('Habit deleted.')
    } catch (requestError) {
      setNotice(
        getApiErrorMessage(requestError, 'Could not delete that habit.'),
      )
    }
  }

  async function handleMarkDone(habitId) {
    try {
      await completeHabitRecord(habitId)
      setNotice('Habit marked complete.')
    } catch (requestError) {
      setNotice(
        getApiErrorMessage(
          requestError,
          'That habit could not be marked complete.',
        ),
      )
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#744326]">My Habits</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
            Manage daily check-ins
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Your saved habits from Django. Search, complete, edit, or create a
            new habit from here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
            <span className="rounded-full bg-white/70 px-3 py-1">
              {habits.length} total
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
              {habits.filter((habit) => habit.completedToday).length} complete
              today
            </span>
          </div>
        </div>
        <Link
          to="/habits/create"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/15 transition duration-200 hover:bg-[#744326] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30"
        >
          <FiPlus />
          Add Habit
        </Link>
      </section>

      <section className="rounded-[1.25rem] border border-white/75 bg-[#fffaf4]/76 p-3 shadow-sm shadow-stone-900/5 backdrop-blur">
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
        <p
          role={error ? 'alert' : 'status'}
          className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${
            error
              ? 'border-red-100 bg-red-50 text-red-700'
              : 'border-emerald-100 bg-emerald-50 text-emerald-700'
          }`}
        >
          {error || notice}
        </p>
      ) : null}

      {isLoading ? (
        <EmptyState
          title="Loading habits"
          message="Pulling your saved habits from the Django backend."
        />
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
        <EmptyState
          actionLabel={habits.length ? 'Create another habit' : 'Create your first habit'}
          actionTo="/habits/create"
          title={habits.length ? 'No matching habits' : 'No habits yet'}
          message={
            habits.length
              ? 'Try a different search or category, or create a new habit if this one is missing.'
              : 'Start with one small habit. You can always edit it later.'
          }
        />
      )}
    </div>
  )
}

export default Habits
