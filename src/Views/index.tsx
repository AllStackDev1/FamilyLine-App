import { lazy } from 'react'

import NotFound from './404'

const Login = lazy(() => import('./Login'))
// const Logout = lazy(() => import('./Logout'))
const Register = lazy(() => import('./Register'))
// const Dashboard = lazy(() => import('./Dashboard'))

export const Views = {
  Login,
  NotFound,
  // Logout,
  Register
  // Dashboard
}
