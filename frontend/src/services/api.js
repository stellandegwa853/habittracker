import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const TOKEN_STORAGE_KEY = 'vibecheck_tokens'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getStoredTokens() {
  const rawTokens = localStorage.getItem(TOKEN_STORAGE_KEY)

  if (!rawTokens) {
    return null
  }

  try {
    return JSON.parse(rawTokens)
  } catch {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return null
  }
}

export function storeTokens(tokens) {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

api.interceptors.request.use((config) => {
  const tokens = getStoredTokens()

  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const tokens = getStoredTokens()

    if (
      error.response?.status === 401 &&
      tokens?.refresh &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post(`${API_BASE_URL}/users/refresh/`, {
          refresh: tokens.refresh,
        })

        storeTokens({ ...tokens, access: data.access })
        originalRequest.headers.Authorization = `Bearer ${data.access}`

        return api(originalRequest)
      } catch (refreshError) {
        clearTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export async function registerUser(payload) {
  const { data } = await api.post('/users/register/', payload)
  return data
}

export async function loginUser(payload) {
  const { data } = await api.post('/users/login/', payload)
  storeTokens(data)
  return data
}

export async function fetchProfile() {
  const { data } = await api.get('/users/profile/')
  return data
}

export async function fetchDashboard() {
  const { data } = await api.get('/habits/dashboard/')
  return data
}

export async function fetchHabits() {
  const { data } = await api.get('/habits/')
  return Array.isArray(data) ? data : data.results || []
}

export async function fetchHabit(habitId) {
  const { data } = await api.get(`/habits/${habitId}/`)
  return data
}

export async function createHabit(payload) {
  const { data } = await api.post('/habits/', payload)
  return data
}

export async function updateHabit(habitId, payload) {
  const { data } = await api.patch(`/habits/${habitId}/`, payload)
  return data
}

export async function completeHabit(habitId) {
  const { data } = await api.post(`/habits/${habitId}/complete/`)
  return data
}

export async function deleteHabit(habitId) {
  await api.delete(`/habits/${habitId}/`)
}

export async function fetchCompletions() {
  const { data } = await api.get('/habits/completions/')
  return Array.isArray(data) ? data : data.results || []
}

export async function fetchHabitCompletions(habitId) {
  const { data } = await api.get(`/habits/${habitId}/completions/`)
  return Array.isArray(data) ? data : data.results || []
}

export async function createHabitCompletion(habitId, completedDate) {
  const { data } = await api.post(`/habits/${habitId}/completions/`, {
    completed_date: completedDate,
  })
  return data
}

export async function updateProfile(payload) {
  const { data } = await api.patch('/users/profile/', payload)
  return data
}

export async function fetchPreferences() {
  const { data } = await api.get('/users/preferences/')
  return data
}

export async function updatePreferences(payload) {
  const { data } = await api.patch('/users/preferences/', payload)
  return data
}

export async function changePassword(payload) {
  const { data } = await api.post('/users/change-password/', payload)
  return data
}

export { API_BASE_URL }
export default api
