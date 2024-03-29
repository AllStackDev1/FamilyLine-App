/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { authStore } from 'stores/auth.store'
import { profile } from 'utils/api/services'
import { useQuery } from 'react-query'

interface IProps {
  children: any
}

const RequireAuth = ({ children }: IProps) => {
  const { access } = authStore()

  const { data } = useQuery('profile', () => profile(), {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data?.[0]) {
      localStorage.setItem('_fl_u_F', JSON.stringify(data[0]))
      authStore.setState({ family: data[0] })
    }
  }, [data])

  return access ? children : <Navigate to="/login" />
}

export default RequireAuth
