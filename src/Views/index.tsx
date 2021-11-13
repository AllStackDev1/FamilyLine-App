import { lazy } from 'react'

import NotFound from './404'

const Login = lazy(() => import('./Login'))
// const Logout = lazy(() => import('./Logout'))
const Register = lazy(() => import('./Register'))
const Profile = lazy(() => import('./Profile'))

export const Views = {
  Login,
  // Logout,
  Profile,
  NotFound,
  Register
}
