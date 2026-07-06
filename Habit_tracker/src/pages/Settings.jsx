import { useState } from 'react'

function Settings() {
  const [reminders, setReminders] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <p className="text-sm font-medium text-[#744326]">Settings</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal text-stone-950">
          Make VibeCheck yours
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          These controls are visual for now, ready for real settings when the
          backend grows into them.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel title="Account settings">
          <Field label="Change password" placeholder="New password placeholder" />
          <button
            type="button"
            className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
          >
            Delete account
          </button>
        </Panel>

        <Panel title="Notification settings">
          <Toggle
            checked={reminders}
            label="Daily reminder"
            onClick={() => setReminders((value) => !value)}
          />
          <Field label="Daily notification time" type="time" />
        </Panel>

        <Panel title="Theme settings">
          <Toggle
            checked={darkMode}
            label="Dark mode"
            onClick={() => setDarkMode((value) => !value)}
          />
          <p className="text-sm text-stone-500">
            Theme switching is visual only for now.
          </p>
        </Panel>

        <Panel title="Data settings">
          <button
            type="button"
            className="rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white"
          >
            Export data
          </button>
          <p className="text-sm leading-6 text-stone-500">
            Download support will be added after real backend data is wired in.
          </p>
        </Panel>
      </section>
    </div>
  )
}

function Panel({ children, title }) {
  return (
    <section className="space-y-5 rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
      <h3 className="text-xl font-semibold text-stone-950">{title}</h3>
      {children}
    </section>
  )
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        type={type}
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
