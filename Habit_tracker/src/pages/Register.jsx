import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingBackground from '../assets/landing_background.jpg'
import { loginUser, registerUser } from '../services/api'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function getErrorMessage(requestError) {
    const responseData = requestError.response?.data

    if (!responseData) {
      return 'Could not create your account. Please try again.'
    }

    if (typeof responseData === 'string') {
      return responseData
    }

    return (
      responseData.detail ||
      responseData.non_field_errors?.[0] ||
      Object.values(responseData).flat()[0] ||
      'Could not create your account. Please try again.'
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        email: form.email,
        password: form.password,
      })
      await loginUser({
        email: form.email,
        password: form.password,
      })
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className="relative h-dvh overflow-hidden bg-stone-950 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${landingBackground})` }}
    >
      <section className="flex h-full items-center justify-center px-4 py-3 sm:px-8 lg:justify-end lg:px-16 xl:px-24">
        <div className="w-full max-w-2xl rounded-[28px] border border-white/25 bg-white/15 px-5 py-5 shadow-2xl shadow-black/25 backdrop-blur-md sm:px-9 sm:py-7 lg:mr-6 xl:mr-12">
          <Link
            to="/"
            className="text-sm font-medium tracking-[0.18em] text-white/80 transition hover:text-white"
          >
            VibeCheck
          </Link>

          <div className="mt-5 sm:mt-7">
            <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              Create Account
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Start tracking your habits and building better routines.
            </p>
          </div>

          <form className="mt-5 space-y-4 sm:mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <FormField
                label="First Name"
                name="first_name"
                autoComplete="given-name"
                type="text"
                value={form.first_name}
                onChange={handleChange}
              />
              <FormField
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                type="text"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <FormField
                label="Username"
                name="username"
                autoComplete="username"
                type="text"
                value={form.username}
                onChange={handleChange}
              />
              <FormField
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <FormField
                label="Password"
                name="password"
                autoComplete="new-password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              <FormField
                label="Confirm Password"
                name="confirm_password"
                autoComplete="new-password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-red-100/30 bg-red-950/45 px-4 py-2 text-sm text-red-50">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto flex w-full max-w-sm items-center justify-center rounded-lg bg-amber-800/90 px-6 py-2.5 text-base font-medium text-white shadow-lg shadow-black/20 transition hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-white/45 disabled:cursor-not-allowed disabled:bg-stone-500/80"
            >
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

function FormField({ autoComplete, label, name, onChange, type, value }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/85 sm:text-base">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-lg border border-white/30 bg-white/85 px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-white focus:bg-white focus:ring-2 focus:ring-white/40 sm:px-4 sm:py-2.5 sm:text-base"
      />
    </label>
  )
}

export default Register
