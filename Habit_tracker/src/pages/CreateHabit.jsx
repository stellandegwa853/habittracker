import { useNavigate } from 'react-router-dom'
import HabitForm from '../components/HabitForm'
import { useAppData } from '../context/useAppData'

function CreateHabit() {
  const navigate = useNavigate()
  const { createHabitRecord } = useAppData()

  async function handleSubmit(form) {
    await createHabitRecord(form)
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
          Give the habit a clear shape. This one will be saved to your
          VibeCheck backend.
        </p>
      </section>

      <HabitForm onSubmit={handleSubmit} submitLabel="Save Habit" />
    </div>
  )
}

export default CreateHabit
