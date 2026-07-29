import { useState } from 'react'
import { Link } from 'react-router-dom'
import CollapsibleSection from './CollapsibleSection'
import { durationToSeconds, formatDuration } from '../utils/habitTransforms'
import { categories } from '../utils/mockData'

const defaultValues = {
  title: '',
  description: '',
  category: 'Health',
  frequency: 'Daily',
  timeOfDay: 'Morning',
  goal: '',
  goalType: 'simple',
  targetDurationValue: '',
  targetDurationUnit: 'minutes',
  timerEnabled: false,
  reminderTime: '',
  startDate: '',
  moodTag: 'Calm',
  targetDays: '',
}

const frequencyOptions = ['Daily', 'Weekdays', 'Twice weekly', 'Weekly']
const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night', 'Weekend']
const vibeOptions = ['Calm', 'Focused', 'Reset', 'Warm', 'Productive']
const goalOptions = [
  { label: 'Simple completion', value: 'simple' },
  { label: 'Time-based', value: 'time' },
]
const durationUnits = [
  { label: 'minutes', value: 'minutes' },
  { label: 'hours', value: 'hours' },
]

function HabitForm({
  error = '',
  initialValues = {},
  isSubmitting = false,
  onSubmit,
  submitLabel = 'Save Habit',
}) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues })
  const [fieldErrors, setFieldErrors] = useState({})
  const isTimeGoal = form.goalType === 'time'
  const durationSeconds = durationToSeconds(
    form.targetDurationValue,
    form.targetDurationUnit,
  )

  function handleChange(event) {
    const { checked, name, type, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setForm((currentForm) => {
      const nextForm = { ...currentForm, [name]: nextValue }

      if (name === 'goalType' && value === 'simple') {
        nextForm.timerEnabled = false
      }

      return nextForm
    })

    if (name === 'targetDurationValue' || name === 'goalType') {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        targetDurationValue: '',
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.goalType === 'time' && !durationSeconds) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        targetDurationValue: 'Add a target duration for this habit.',
      }))
      return
    }

    onSubmit?.(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.7rem] border border-white/75 bg-[#fffaf4]/78 p-5 shadow-sm shadow-stone-900/5 backdrop-blur sm:p-7"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_0.45fr]">
        <div>
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#744326]">Habit setup</p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-950">
              Start with the essentials
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              You can add details now, or keep the habit simple and edit it
              later.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Field label="Habit name">
              <input
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Morning pages"
                className={inputClass}
              />
            </Field>

            <Field label="Category">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {categories
                  .filter((category) => category !== 'All')
                  .map((category) => (
                    <option key={category}>{category}</option>
                  ))}
              </select>
            </Field>

            <Field label="Frequency">
              <select
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                className={inputClass}
              >
                {frequencyOptions.map((frequency) => (
                  <option key={frequency}>{frequency}</option>
                ))}
              </select>
            </Field>

            <Field label="Time of day">
              <select
                name="timeOfDay"
                value={form.timeOfDay}
                onChange={handleChange}
                className={inputClass}
              >
                {timeOptions.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </Field>
          </div>

          <section className="mt-6 rounded-[1.25rem] border border-stone-200/70 bg-white/58 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Goal type
                </p>
                <p className="mt-1 max-w-xl text-sm leading-6 text-stone-600">
                  Choose whether this habit is a simple check-in or a timed
                  session.
                </p>
              </div>
              <select
                name="goalType"
                value={form.goalType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#8a5637]/40 focus:bg-white focus:ring-2 focus:ring-[#8a5637]/15 lg:max-w-56"
              >
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {isTimeGoal ? (
              <div className="mt-5 rounded-[1rem] border border-[#8a5637]/10 bg-[#f7f1ea]/70 p-4">
                <p className="text-sm leading-6 text-stone-600">
                  Use this for habits like reading, studying, running,
                  meditation, or workouts.
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_0.65fr]">
                  <Field
                    error={fieldErrors.targetDurationValue}
                    label="Target duration"
                  >
                    <input
                      aria-invalid={fieldErrors.targetDurationValue ? 'true' : 'false'}
                      min="1"
                      name="targetDurationValue"
                      placeholder="20"
                      type="number"
                      value={form.targetDurationValue}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Unit">
                    <select
                      name="targetDurationUnit"
                      value={form.targetDurationUnit}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {durationUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-stone-200/70 bg-white/70 px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-stone-800">
                      Enable timer
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-stone-500">
                      Start, pause, reset, and finish this habit from the
                      habit card.
                    </span>
                  </span>
                  <input
                    checked={form.timerEnabled}
                    name="timerEnabled"
                    onChange={handleChange}
                    type="checkbox"
                    className="h-5 w-5 rounded border-stone-300 accent-[#8a5637] focus:ring-[#8a5637]/30"
                  />
                </label>
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-stone-200/70 bg-white/65 px-4 py-3 text-sm leading-6 text-stone-600">
                Use this for habits you only need to mark as done.
              </p>
            )}
          </section>

          <CollapsibleSection
            className="mt-6"
            title="Advanced options"
            summary="Optional note, reminders, start date, vibe tag, and description."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <Field
                helper="Optional note kept for older habits or extra context."
                label="Goal note"
              >
                <input
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="Read before bed"
                  className={inputClass}
                />
              </Field>

              <Field label="Target days">
                <input
                  min="1"
                  name="targetDays"
                  placeholder="Optional"
                  type="number"
                  value={form.targetDays}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field label="Reminder time">
                <input
                  type="time"
                  name="reminderTime"
                  value={form.reminderTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field label="Start date">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field label="Vibe tag">
                <select
                  name="moodTag"
                  value={form.moodTag}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {vibeOptions.map((vibe) => (
                    <option key={vibe}>{vibe}</option>
                  ))}
                </select>
              </Field>

              <Field label="Description" className="lg:col-span-2">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What does this habit help you do?"
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </CollapsibleSection>
        </div>

        <aside className="h-fit rounded-[1.25rem] border border-stone-200/70 bg-white/64 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-400">
            Live preview
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-950">
            {form.title || 'Your habit name'}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#8a5637]/10 px-3 py-1 text-xs font-semibold text-[#744326]">
              {form.category}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
              {form.timeOfDay}
            </span>
          </div>
          <div className="mt-5 rounded-2xl bg-[#f7f1ea] p-4">
            <p className="text-sm font-semibold text-stone-900">
              {isTimeGoal
                ? `${durationSeconds ? formatDuration(durationSeconds) : 'Timed'} session`
                : 'Simple completion'}
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              {isTimeGoal
                ? form.timerEnabled
                  ? 'Timer on. Complete it after the session.'
                  : 'Timed goal saved without timer controls.'
                : form.goal || 'A simple check-in habit you can complete today.'}
            </p>
          </div>
        </aside>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 border-t border-stone-200/70 pt-5 sm:flex-row sm:justify-end">
        <Link
          to="/habits"
          className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/75 px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a5637]/15 transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-none"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ children, className = '', error = '', helper = '', label }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-stone-700">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm text-red-700">{error}</span>
      ) : helper ? (
        <span className="mt-2 block text-xs leading-5 text-stone-500">
          {helper}
        </span>
      ) : null}
    </label>
  )
}

const inputClass =
  'mt-2 w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#8a5637]/40 focus:bg-white focus:ring-2 focus:ring-[#8a5637]/15'

export default HabitForm
