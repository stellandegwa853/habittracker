import { Outlet } from 'react-router-dom'
import { AppDataProvider } from '../context/AppDataContext.jsx'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppLayout() {
  return (
    <AppDataProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#f7f1ea] text-stone-900">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,83,55,0.08)_1px,transparent_0)] [background-size:28px_28px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.84),rgba(239,229,217,0.7)_52%,rgba(222,203,183,0.5))]"
        />
        <div className="relative min-h-screen">
          <Sidebar />

          <div className="min-h-screen pb-24 lg:ml-72 lg:pb-0">
            <Topbar />
            <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AppDataProvider>
  )
}

export default AppLayout
