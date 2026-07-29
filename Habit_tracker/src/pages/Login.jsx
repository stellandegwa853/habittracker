import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import landingBackground from '../assets/landing_background.jpg'
import { loginUser } from '../services/api'
import { getApiErrorMessage } from '../utils/errorMessages'

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
  const [showPassword, setShowPassword] = useState(false)

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
      setError(
        getApiErrorMessage(
          requestError,
          'Could not log in. Please check your email and password.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className="relative min-h-dvh overflow-y-auto bg-stone-950 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${landingBackground})` }}
    >
      <section className="flex min-h-dvh items-center justify-center px-4 py-6 sm:px-8 lg:justify-end lg:px-16 xl:px-24">
        <div className="w-full max-w-xl rounded-[28px] border border-white/25 bg-stone-950/25 px-5 py-6 shadow-2xl shadow-black/25 backdrop-blur-md sm:px-9 sm:py-8 lg:mr-6 xl:mr-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-white/85 transition hover:text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full border border-white/25 bg-white/15 text-xs">
              ✓
            </span>
            <span>VibeCheck</span>
          </Link>

          <div className="mt-9 sm:mt-12">
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
                id="login-email"
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
              <div className="relative mt-2">
                <input
                  id="login-password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/30 bg-white/85 px-4 py-2.5 pr-12 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-white focus:bg-white focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-stone-500 transition hover:bg-stone-200/70 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500/30"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
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
              <p
                role="alert"
                className="rounded-2xl border border-red-100/30 bg-red-950/45 px-4 py-3 text-sm text-red-50"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto flex w-full max-w-sm items-center justify-center rounded-full bg-amber-800/95 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-white/45 disabled:cursor-not-allowed disabled:bg-stone-500/80"
            >
              {isSubmitting ? 'Logging in...' : 'Login to dashboard'}
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
