import { useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
      element: <Views.Login />
    },
    {
      path: '/register',
      element: <Views.Register />
    },
    {
      path: '/profile',
      element: <Views.Profile />
    },
    {
      path: '/my-family',
      element: <Views.MyFamily />
    },
    {
      path: '/memories',
      element: <Views.Memories />
    },
    {
      path: '/events',
      element: <Views.Events />
    },
    {
      path: '/notifications',
      element: <Views.Notifications />
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
