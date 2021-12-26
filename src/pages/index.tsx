import { lazy } from 'react'

import NotFound from './404'

const Login = lazy(() => import('./login'))
const Register = lazy(() => import('./register'))
const AccountSuccess = lazy(() => import('./register/success'))
const Tree = lazy(() => import('./tree'))
const Memories = lazy(() => import('./memories'))
const Events = lazy(() => import('./events'))
const AddMember = lazy(() => import('./add-member'))
const Notifications = lazy(() => import('./notifications'))

export const Views = {
  Login,
  Tree,
  Events,
  NotFound,
  Register,
  Memories,
  AddMember,
  Notifications,
  AccountSuccess
}
