import { Outlet } from 'react-router-dom'
import { AppDataProvider } from '../context/AppDataContext.jsx'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppLayout() {
  return (
    <AppDataProvider>
      <div className="min-h-screen bg-[#f4efe8] text-stone-900">
        <div className="min-h-screen bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(231,217,202,0.72))]">
          <Sidebar />

          <div className="min-h-screen pb-24 lg:ml-72 lg:pb-0">
            <Topbar />
            <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AppDataProvider>
  )
}

export default AppLayout
