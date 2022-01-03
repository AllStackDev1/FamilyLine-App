import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStore } from 'stores/auth.store'
import LoadingOverlay from 'components/LoadingOverlay'

const Logout: FC = () => {
  document.title = 'Signing out...'
  const [_family, setUser] = useState<any>()
  const navigate = useNavigate()

  const { family } = authStore(s => s)

  console.log(family)

  useEffect(() => {
    if (family) {
      setUser(family)
      localStorage.clear()
      setTimeout(() => {
        window.location.reload()
      }, 200)
    } else {
      navigate('/login')
    }
  }, [family])
  return <LoadingOverlay text={`Good Bye, ${_family?.name}`} />
}

export default Logout
