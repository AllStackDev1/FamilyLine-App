/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom'
import { authStore } from 'Stores/auth.store'

interface IProps {
  children: any
}

const RequireAuth = ({ children }: IProps) => {
  const { access } = authStore()

  return access ? children : <Navigate to="/login" />
}

export default RequireAuth
