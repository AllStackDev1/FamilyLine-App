import { lazy } from 'react'

import NotFound from './404'

const Login = lazy(() => import('./login'))
// const Logout = lazy(() => import('./Logout'))
const Register = lazy(() => import('./register'))
const AccountSuccess = lazy(() => import('./register/success'))
const Profile = lazy(() => import('./profile'))
const MyFamily = lazy(() => import('./my-family'))
const Memories = lazy(() => import('./memories'))
const Events = lazy(() => import('./events'))
const Notifications = lazy(() => import('./notifications'))

export const Views = {
  Login,
  // Logout,
  Events,
  Profile,
  NotFound,
  Register,
  MyFamily,
  Memories,
  Notifications,
  AccountSuccess
}
