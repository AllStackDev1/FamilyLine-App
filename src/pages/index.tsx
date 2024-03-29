import { lazy } from 'react'

import NotFound from './404'

const Login = lazy(() => import('./login'))
const Logout = lazy(() => import('./logout'))
const Events = lazy(() => import('./events'))
const Members = lazy(() => import('./members'))
const Register = lazy(() => import('./register'))
const Memories = lazy(() => import('./memories'))
const MemberAdd = lazy(() => import('./members/add'))
const MemberEdit = lazy(() => import('./members/edit'))
const Notifications = lazy(() => import('./notifications'))
const AccountSuccess = lazy(() => import('./register/success'))

export const Views = {
  Login,
  Logout,
  Events,
  Members,
  NotFound,
  Register,
  Memories,
  MemberAdd,
  MemberEdit,
  Notifications,
  AccountSuccess
}
