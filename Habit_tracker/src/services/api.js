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

export async function createHabit(payload) {
  const { data } = await api.post('/habits/', payload)
  return data
}

export async function completeHabit(habitId) {
  const { data } = await api.post(`/habits/${habitId}/complete/`)
  return data
}

export async function deleteHabit(habitId) {
  await api.delete(`/habits/${habitId}/`)
}

export { API_BASE_URL }
export default api
