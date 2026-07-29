import { useEffect, useState } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import EmptyState from '../components/EmptyState'
import { useAppData } from '../context/useAppData'
import { changePassword } from '../services/api'

function Settings() {
  const { habits, isLoading, preferences, profile, updatePreferencesRecord } =
    useAppData()
  const [form, setForm] = useState({
    reminder_enabled: true,
    daily_notification_time: '',
    dark_mode: false,
  })
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    let syncTimer

    if (preferences) {
      syncTimer = window.setTimeout(() => {
        setForm({
          reminder_enabled: preferences.reminder_enabled,
          daily_notification_time:
            preferences.daily_notification_time?.slice(0, 5) || '',
          dark_mode: preferences.dark_mode,
        })
      }, 0)
    }

    return () => window.clearTimeout(syncTimer)
  }, [preferences])

  if (isLoading) {
    return (
      <EmptyState
        title="Loading settings"
        message="Getting your account preferences from Django."
      />
    )
  }

  function updateForm(nextValues) {
    setForm((currentForm) => ({ ...currentForm, ...nextValues }))
  }

  async function savePreferences(nextValues) {
    const nextForm = { ...form, ...nextValues }
    updateForm(nextValues)
    await updatePreferencesRecord({
      ...nextForm,
      daily_notification_time: nextForm.daily_notification_time || null,
    })
    setNotice('Settings saved.')
  }

  function updatePasswordForm(event) {
    const { name, value } = event.target
    setPasswordForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')

    try {
      if (passwordForm.new_password !== passwordForm.confirm_new_password) {
        setError('New passwords do not match.')
        return
      }

      await changePassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      })
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_new_password: '',
      })
      setNotice('Password updated. Use the new password next time you log in.')
    } catch (requestError) {
      const responseData = requestError.response?.data
      setError(
        responseData?.current_password?.[0] ||
          responseData?.new_password?.[0] ||
          responseData?.detail ||
          'Could not update password.',
      )
    }
  }

  function exportData() {
    const payload = {
      exported_at: new Date().toISOString(),
      profile,
      preferences: form,
      habits,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'vibecheck-data.json'
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Export downloaded.')
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/76 p-5 shadow-sm shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">Settings</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-stone-950">
          Account and preferences
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Manage reminders, appearance, data export, and account security.
        </p>
      </section>

      {notice ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel title="Account settings">
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <Field
              label="Current password"
              name="current_password"
              onChange={updatePasswordForm}
              placeholder="Your current password"
              type="password"
              value={passwordForm.current_password}
            />
            <Field
              label="New password"
              name="new_password"
              onChange={updatePasswordForm}
              placeholder="At least 8 characters"
              type="password"
              value={passwordForm.new_password}
            />
            <Field
              label="Confirm new password"
              name="confirm_new_password"
              onChange={updatePasswordForm}
              placeholder="Repeat new password"
              type="password"
              value={passwordForm.confirm_new_password}
            />
            <button
              type="submit"
              className="rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30"
            >
              Change password
            </button>
          </form>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete account
          </button>
        </Panel>

        <Panel title="Notification settings">
          <Toggle
            checked={form.reminder_enabled}
            label="Daily reminder"
            onClick={() =>
              savePreferences({ reminder_enabled: !form.reminder_enabled })
            }
          />
          <label className="block">
            <span className="text-sm font-medium text-stone-700">
              Daily notification time
            </span>
            <input
              type="time"
              value={form.daily_notification_time}
              onChange={(event) =>
                updateForm({ daily_notification_time: event.target.value })
              }
              onBlur={(event) =>
                savePreferences({ daily_notification_time: event.target.value })
              }
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8a5637]/40 focus:ring-2 focus:ring-[#8a5637]/15"
            />
          </label>
        </Panel>

        <Panel title="Theme settings">
          <Toggle
            checked={form.dark_mode}
            label="Dark mode"
            onClick={() => savePreferences({ dark_mode: !form.dark_mode })}
          />
          <p className="text-sm text-stone-500">
            Your appearance preference is saved with your account.
          </p>
        </Panel>

        <Panel title="Data settings">
          <button
            type="button"
            onClick={exportData}
            className="rounded-full bg-[#8a5637] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#744326] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/30"
          >
            Export data
          </button>
          <p className="text-sm leading-6 text-stone-500">
            Download a JSON copy of your profile, preferences, and habits.
          </p>
        </Panel>
      </section>

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete account?"
        message="Account deletion is permanent. This version does not support deleting an account from the app, so no data will be removed from this button."
        confirmLabel="I understand"
        tone="danger"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false)
          setNotice('Account deletion requires administrator support.')
        }}
      />
    </div>
  )
}

function Panel({ children, title }) {
  return (
    <section className="space-y-5 rounded-[1.5rem] border border-white/75 bg-[#fffaf4]/78 p-6 shadow-sm shadow-stone-900/5 backdrop-blur">
      <h3 className="text-xl font-semibold text-stone-950">{title}</h3>
      {children}
    </section>
  )
}

function Field({
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value = '',
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8a5637]/40 focus:ring-2 focus:ring-[#8a5637]/15"
      />
    </label>
  )
}

function Toggle({ checked, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl bg-white/75 px-4 py-3 text-left"
    >
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <span
        className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
          checked ? 'justify-end bg-[#8a5637]' : 'justify-start bg-stone-300'
        }`}
      >
        <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
      </span>
    </button>
  )
}

export default Settings
