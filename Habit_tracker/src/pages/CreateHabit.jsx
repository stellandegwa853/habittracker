import { useNavigate } from 'react-router-dom'
import HabitForm from '../components/HabitForm'

function CreateHabit() {
  const navigate = useNavigate()

  function handleSubmit(form) {
    console.log('Mock habit created:', form)
    window.alert('Habit saved locally for now. Backend connection comes later.')
    navigate('/habits')
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">New habit</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
          Start small, stay kind
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Give the habit a clear shape. The goal is not to impress anyone, just
          to make showing up easier.
        </p>
      </section>

      <HabitForm onSubmit={handleSubmit} submitLabel="Save Habit" />
    </div>
  )
}

export default CreateHabit
