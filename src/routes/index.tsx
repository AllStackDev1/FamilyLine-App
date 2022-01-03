import { useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'

import { Splash } from 'components/Shared/Loading'
import { Views } from 'pages'

import RequireAuth from 'routes/guard'

function Router() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/login')
    }
  }, [pathname])

  const element = useRoutes([
    {
      path: '/login',
      element: <Views.Login />
    },
    {
      path: '/register',
      element: <Views.Register />
    },
    {
      path: '/register/success',
      element: <Views.AccountSuccess />
    },
    {
      path: '/members',
      element: (
        <RequireAuth>
          <Views.Members />
        </RequireAuth>
      )
    },
    {
      path: '/memories',
      element: (
        <RequireAuth>
          <Views.Memories />
        </RequireAuth>
      )
    },
    {
      path: '/events',
      element: (
        <RequireAuth>
          <Views.Events />
        </RequireAuth>
      )
    },
    {
      path: '/notifications',
      element: (
        <RequireAuth>
          <Views.Notifications />
        </RequireAuth>
      )
    },
    {
      path: '/logout',
      element: <Views.Logout />
    },
    {
      path: '*',
      element: <Views.NotFound />
    }
  ])

  return (
    <Suspense fallback={<Splash text="opening..." />}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={pathname.split('/')[1]}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1,
              transition: { duration: 0.5, ease: 'linear' }
            }
          }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  )
}

export default Router
