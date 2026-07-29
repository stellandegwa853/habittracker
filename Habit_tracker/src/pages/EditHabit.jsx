import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import HabitForm from '../components/HabitForm'
import { useAppData } from '../context/useAppData'
import { getApiErrorMessage } from '../utils/errorMessages'
import { toHabitFormValues } from '../utils/habitTransforms'

function EditHabit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { habits, isLoading, updateHabitRecord } = useAppData()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const habit = habits.find((item) => String(item.id) === id)

  async function handleSubmit(form) {
    setError('')
    setIsSubmitting(true)

    try {
      await updateHabitRecord(id, form)
      navigate(`/habits/${habit.id}`, {
        state: { notice: 'Habit updated.' },
      })
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          'Could not update that habit. Please check the form.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <EmptyState
        title="Loading habit"
        message="Finding that rhythm before opening the edit form."
      />
    )
  }

  if (!habit) {
    return (
      <EmptyState
        actionLabel="Back to habits"
        actionTo="/habits"
        title="Habit not found"
        message="That habit is not in your saved list."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">Edit habit</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
          Update this check-in
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Change the details that matter and keep the rest simple.
        </p>
      </section>

      <HabitForm
        error={error}
        initialValues={toHabitFormValues(habit)}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        submitLabel="Update Habit"
      />
    </div>
  )
}

export default EditHabit
