import { useEffect, Suspense } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { Splash } from 'Components/Shared/Loading'
import { Views } from 'Views'

function Router() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/login')
    }
  }, [])

  const element = useRoutes([
    {
      path: '/login',
      element: (
        <Suspense fallback={<Splash text="opening login..." />}>
          <Views.Login />
        </Suspense>
      )
    },
    {
      path: '/register',
      element: (
        <Suspense fallback={<Splash text="opening register..." />}>
          <Views.Register />
        </Suspense>
      )
    },
    {
      path: '/dashboard/profile',
      element: (
        <Suspense fallback={<Splash text="opening dashboard..." />}>
          <Views.Profile />
        </Suspense>
      )
    },
    {
      path: '/dashboard',
      element: (
        <Suspense fallback={<Splash text="opening dashboard..." />}>
          <Views.Login />
        </Suspense>
      )
    },
    {
      path: '/logout',
      element: <Views.NotFound />
    },
    {
      path: '*',
      element: <Views.NotFound />
    }
  ])

  return element
}

export default Router
