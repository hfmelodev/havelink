import { Route, Routes as Router } from 'react-router'
import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { NotFound } from './not-found'
import { Auth } from './pages/auth'
import { Dash } from './pages/dash'
import { Home } from './pages/home'
import { Networks } from './pages/networks'

export function Routes() {
  return (
    <Router>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="dash" element={<Dash />} />
        <Route path="dash/social" element={<Networks />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Router>
  )
}
