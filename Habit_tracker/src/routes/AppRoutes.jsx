import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Achievements from '../pages/Achievements'
import Calendar from '../pages/Calendar'
import CreateHabit from '../pages/CreateHabit'
import Dashboard from '../pages/Dashboard'
import EditHabit from '../pages/EditHabit'
import HabitDetails from '../pages/HabitDetails'
import Habits from '../pages/Habits'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Settings from '../pages/Settings'
import Statistics from '../pages/Statistics'
import { getStoredTokens } from '../services/api'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/habits/" element={<Navigate to="/habits" replace />} />
        <Route path="/habits/create" element={<CreateHabit />} />
        <Route path="/habits/:id" element={<HabitDetails />} />
        <Route path="/habits/:id/edit" element={<EditHabit />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!getStoredTokens()?.access) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default AppRoutes
