import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import landingBackground from '../assets/landing_background.jpg'
import { loginUser } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/dashboard'
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { checked, name, type, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await loginUser({
        email: form.email,
        password: form.password,
      })
      navigate(redirectTo, { replace: true })
    } catch (requestError) {
      const responseData = requestError.response?.data

      setError(
        responseData?.detail ||
          responseData?.non_field_errors?.[0] ||
          Object.values(responseData || {}).flat()[0] ||
          'Could not log in. Please check your email and password.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className="relative h-dvh overflow-hidden bg-stone-950 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${landingBackground})` }}
    >
      <section className="flex h-full items-center justify-center px-4 py-4 sm:px-8 lg:justify-end lg:px-16 xl:px-24">
        <div className="w-full max-w-2xl rounded-[28px] border border-white/25 bg-white/15 px-5 py-6 shadow-2xl shadow-black/25 backdrop-blur-md sm:px-9 sm:py-8 lg:mr-6 xl:mr-12">
          <Link
            to="/"
            className="text-sm font-medium tracking-[0.18em] text-white/80 transition hover:text-white"
          >
            VibeCheck
          </Link>

          <div className="mt-10 sm:mt-14">
            <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Login
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Welcome back to VibeCheck — continue building better habits.
            </p>
          </div>

          <form
            className="mt-7 space-y-4 sm:mt-8 sm:space-y-5"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="text-base font-medium text-white/85">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/30 bg-white/85 px-4 py-2.5 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-white focus:bg-white focus:ring-2 focus:ring-white/40"
              />
            </label>

            <label className="block">
              <span className="text-base font-medium text-white/85">
                Password
              </span>
              <input
                required
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/30 bg-white/85 px-4 py-2.5 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-white focus:bg-white focus:ring-2 focus:ring-white/40"
              />
            </label>

            <div className="flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/40 bg-white/80 text-stone-800 focus:ring-white/40"
                />
                <span>Remember me</span>
              </label>

              <a
                href="#forgot-password"
                className="font-medium text-white/85 underline-offset-4 transition hover:text-white hover:underline"
              >
                Forgot Password?
              </a>
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
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white/80">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
