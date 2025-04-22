import { Route, Routes as Router } from 'react-router'
import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { PrivateRoute } from './middleware'
import { NotFound } from './not-found'
import { Admin } from './pages/admin'
import { Auth } from './pages/auth'
import { Home } from './pages/home'
import { Networks } from './pages/networks'

export function Routes() {
  return (
    <Router>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/social"
          element={
            <PrivateRoute>
              <Networks />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Router>
  )
}
