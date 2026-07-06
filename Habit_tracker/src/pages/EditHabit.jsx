import { Link, useNavigate, useParams } from 'react-router-dom'
import HabitForm from '../components/HabitForm'
import { habits } from '../utils/mockData'

function EditHabit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const habit = habits.find((item) => String(item.id) === id) || habits[0]

  function handleSubmit(form) {
    console.log('Mock habit updated:', form)
    window.alert('Habit updated locally for now.')
    navigate(`/habits/${habit.id}`)
  }

  if (!habit) {
    return (
      <EmptyState
        title="Habit not found"
        message="That habit is not in the mock list."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">Edit habit</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
          Adjust the rhythm
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Change what needs changing. A habit can evolve with your actual life.
        </p>
      </section>

      <HabitForm
        initialValues={habit}
        onSubmit={handleSubmit}
        submitLabel="Update Habit"
      />
    </div>
  )
}

function EmptyState({ message, title }) {
  return (
    <section className="rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center shadow-xl shadow-stone-900/5">
      <h2 className="text-3xl font-semibold text-stone-950">{title}</h2>
      <p className="mt-3 text-stone-600">{message}</p>
      <Link
        to="/habits"
        className="mt-6 inline-flex rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white"
      >
        Back to habits
      </Link>
    </section>
  )
}

export default EditHabit
