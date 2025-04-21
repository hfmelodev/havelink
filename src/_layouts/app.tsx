import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col container mx-auto w-full py-4 items-center ">
      <div>
        <Outlet />
      </div>
    </div>
  )
}
