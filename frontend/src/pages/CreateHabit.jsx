import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HabitForm from '../components/HabitForm'
import { useAppData } from '../context/useAppData'
import { getApiErrorMessage } from '../utils/errorMessages'

function CreateHabit() {
  const navigate = useNavigate()
  const { createHabitRecord } = useAppData()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(form) {
    setError('')
    setIsSubmitting(true)

    try {
      await createHabitRecord(form)
      navigate('/habits', {
        state: { notice: 'Habit created. You can mark it complete today.' },
      })
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          'Could not create that habit. Please check the form.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">New habit</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
          Create a daily check-in
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Add the basics first. Advanced details are optional.
        </p>
      </section>

      <HabitForm
        error={error}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Save Habit"
      />
    </div>
  )
}

export default CreateHabit
