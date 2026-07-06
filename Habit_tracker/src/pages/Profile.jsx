import { useEffect, useState } from 'react'
import { useAppData } from '../context/useAppData'

function Profile() {
  const { dashboard, habits, isLoading, profile, updateProfileRecord } =
    useAppData()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
  })
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let syncTimer

    if (profile) {
      syncTimer = window.setTimeout(() => {
        setForm({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          username: profile.username || '',
          email: profile.email || '',
        })
      }, 0)
    }

    return () => window.clearTimeout(syncTimer)
  }, [profile])

  if (isLoading) {
    return <StateCard message="Loading profile..." />
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await updateProfileRecord(form)
    setNotice('Profile updated.')
  }

  const initials = `${form.first_name?.[0] || ''}${form.last_name?.[0] || ''}` || 'VC'
  const joinedDate = profile?.date_joined
    ? new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(profile.date_joined))
    : 'Recently'

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#8a5637] text-2xl font-semibold text-white">
            {initials.toUpperCase()}
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-stone-950">
            {form.first_name} {form.last_name}
          </h2>
          <p className="mt-1 text-stone-500">@{form.username}</p>
          <p className="mt-1 text-stone-500">{form.email}</p>
          <p className="mt-5 rounded-full bg-white/75 px-4 py-2 text-sm text-stone-600">
            Joined {joinedDate}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Summary label="Habits" value={dashboard?.total_habits ?? habits.length} />
          <Summary label="Best streak" value={`${dashboard?.longest_streak ?? 0}d`} />
          <Summary
            label="Completions"
            value={dashboard?.total_completed ?? profile?.total_completed ?? 0}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <h3 className="text-xl font-semibold text-stone-950">Edit profile</h3>
        {notice ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {notice}
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            <Field
              label="Last name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            <Field
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <Field
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>
          <button
            type="submit"
            className="mt-6 rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#8a5637]/15"
          >
            Save profile
          </button>
        </form>
      </section>
    </div>
  )
}

function Summary({ label, value }) {
  return (
    <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-stone-950">{value}</p>
    </div>
  )
}

function Field({ label, name, onChange, type = 'text', value }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8a5637]/40 focus:ring-2 focus:ring-[#8a5637]/15"
      />
    </label>
  )
}

function StateCard({ message }) {
  return (
    <section className="rounded-[2rem] border border-white/75 bg-white/65 p-8 text-center text-stone-600 shadow-xl shadow-stone-900/5">
      {message}
    </section>
  )
}

export default Profile
