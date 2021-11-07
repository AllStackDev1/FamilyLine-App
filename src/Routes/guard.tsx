import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { authStore } from 'Stores/auth.store'

interface IProps {
  children?: ReactNode
}

const RequireAuth = ({ children }: IProps) => {
  const { token } = authStore()

  return token ? children : <Navigate to="/login" />
}

export default RequireAuth
