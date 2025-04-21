import { Copyright } from '@/components/app/copyright'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col max-w-sm sm:max-w-md md:max-w-lg mx-auto items-center">
      <Outlet />

      <Copyright />
    </div>
  )
}
