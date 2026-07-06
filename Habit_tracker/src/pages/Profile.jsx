import { habits, userProfile } from '../utils/mockData'

function Profile() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#8a5637] text-2xl font-semibold text-white">
            {userProfile.initials}
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-stone-950">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <p className="mt-1 text-stone-500">@{userProfile.username}</p>
          <p className="mt-1 text-stone-500">{userProfile.email}</p>
          <p className="mt-5 rounded-full bg-white/75 px-4 py-2 text-sm text-stone-600">
            Joined {userProfile.joinedDate}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Summary label="Habits" value={habits.length} />
          <Summary label="Best streak" value={`${userProfile.bestStreak}d`} />
          <Summary label="Completions" value={userProfile.totalCompletions} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/75 bg-white/65 p-6 shadow-xl shadow-stone-900/5 backdrop-blur">
        <h3 className="text-xl font-semibold text-stone-950">Edit profile</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="First name" defaultValue={userProfile.firstName} />
          <Field label="Last name" defaultValue={userProfile.lastName} />
          <Field label="Username" defaultValue={userProfile.username} />
          <Field label="Email" defaultValue={userProfile.email} type="email" />
        </div>
        <button
          type="button"
          className="mt-6 rounded-full bg-[#8a5637] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#8a5637]/15"
        >
          Save profile
        </button>
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

function Field({ defaultValue, label, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8a5637]/40 focus:ring-2 focus:ring-[#8a5637]/15"
      />
    </label>
  )
}

export default Profile
