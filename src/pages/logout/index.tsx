import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStore } from 'stores/auth.store'
import LoadingOverlay from 'components/LoadingOverlay'
import { IFamily } from 'interfaces/auth.interface'

const Logout: FC = () => {
  document.title = 'Signing out...'
  const [_family, setUser] = useState<IFamily>()
  const navigate = useNavigate()

  const { family } = authStore(s => s)

  useEffect(() => {
    if (family) {
      setUser(family)
      authStore.setState({})
      localStorage.clear()
      setTimeout(() => {
        window.location.reload()
      }, 200)
    } else {
      navigate('/login')
    }
  }, [family])
  return <LoadingOverlay text={`Good Bye, ${_family?.family_name}`} />
}

export default Logout
