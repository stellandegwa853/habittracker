import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  clearTokens,
  completeHabit,
  createHabit,
  deleteHabit,
  fetchDashboard,
  fetchHabits,
  fetchPreferences,
  fetchProfile,
  updateHabit,
  updatePreferences,
  updateProfile,
} from '../services/api'
import {
  buildWeeklyProgress,
  toHabitPayload,
  toHabitView,
  toHabitViews,
} from '../utils/habitTransforms'
import AppDataContext from './appDataContext'

export function AppDataProvider({ children }) {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [habits, setHabits] = useState([])
  const [preferences, setPreferences] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const handleRequestError = useCallback(
    (requestError, fallbackMessage) => {
      if (requestError.response?.status === 401) {
        clearTokens()
        navigate('/login', { replace: true })
        return
      }

      setError(fallbackMessage)
    },
    [navigate],
  )

  const refresh = useCallback(async () => {
    setError('')

    try {
      const [profileData, dashboardData, habitsData, preferencesData] =
        await Promise.all([
          fetchProfile(),
          fetchDashboard(),
          fetchHabits(),
          fetchPreferences(),
        ])

      setProfile(profileData)
      setDashboard(dashboardData)
      setHabits(toHabitViews(habitsData))
      setPreferences(preferencesData)
    } catch (requestError) {
      handleRequestError(
        requestError,
        'Could not load VibeCheck data. Make sure the Django server is running.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [handleRequestError])

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      refresh()
    }, 0)

    return () => window.clearTimeout(loadTimer)
  }, [refresh])

  async function createHabitRecord(form) {
    const createdHabit = await createHabit(toHabitPayload(form))
    setHabits((currentHabits) => [toHabitView(createdHabit), ...currentHabits])
    await refresh()
    return createdHabit
  }

  async function updateHabitRecord(habitId, form) {
    const updatedHabit = await updateHabit(habitId, toHabitPayload(form))
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === Number(habitId) ? toHabitView(updatedHabit) : habit,
      ),
    )
    await refresh()
    return updatedHabit
  }

  async function deleteHabitRecord(habitId) {
    await deleteHabit(habitId)
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== Number(habitId)),
    )
    await refresh()
  }

  async function completeHabitRecord(habitId) {
    try {
      await completeHabit(habitId)
      setError('')
    } catch (requestError) {
      if (requestError.response?.status !== 400) {
        throw requestError
      }

      setError(requestError.response?.data?.message || '')
    }

    await refresh()
  }

  async function updateProfileRecord(payload) {
    const updatedProfile = await updateProfile(payload)
    setProfile(updatedProfile)
    return updatedProfile
  }

  async function updatePreferencesRecord(payload) {
    const updatedPreferences = await updatePreferences(payload)
    setPreferences(updatedPreferences)
    return updatedPreferences
  }

  const weeklyProgress = useMemo(
    () => dashboard?.weekly_progress || buildWeeklyProgress(habits),
    [dashboard, habits],
  )

  const value = {
    completeHabitRecord,
    createHabitRecord,
    dashboard,
    deleteHabitRecord,
    error,
    habits,
    isLoading,
    preferences,
    profile,
    refresh,
    updateHabitRecord,
    updatePreferencesRecord,
    updateProfileRecord,
    weeklyProgress,
  }

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  )
}
