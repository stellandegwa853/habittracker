import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../utils/mockData'

const defaultValues = {
  title: '',
  description: '',
  category: 'Health',
  frequency: 'Daily',
  timeOfDay: 'Morning',
  goal: '',
  reminderTime: '',
  startDate: '',
  moodTag: 'Calm',
}

const frequencyOptions = ['Daily', 'Weekdays', 'Twice weekly', 'Weekly']
const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night', 'Weekend']
const vibeOptions = ['Calm', 'Focused', 'Reset', 'Warm', 'Productive']

function HabitForm({ initialValues = {}, onSubmit, submitLabel = 'Save Habit' }) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/75 bg-white/70 p-5 shadow-xl shadow-stone-900/5 backdrop-blur sm:p-7"
    >
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

        <Field label="Goal">
          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="20 minutes"
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

        <Field label="Habit color or vibe tag">
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
      </div>

      <Field label="Description" className="mt-5">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          placeholder="What does this habit help you become?"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          to="/habits"
          className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/75 px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:text-stone-950"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#8a5637]/15 transition hover:bg-[#744326]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ children, className = '', label }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'mt-2 w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#8a5637]/40 focus:bg-white focus:ring-2 focus:ring-[#8a5637]/15'

export default HabitForm
