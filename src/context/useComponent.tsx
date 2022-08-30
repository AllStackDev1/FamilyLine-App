import React, {
  FC,
  createContext,
  useState,
  useCallback,
  ReactNode
} from 'react'
import PropTypes from 'prop-types'
import { useDisclosure } from '@chakra-ui/react'

const ComponentContext = createContext({})

export const ComponentContextProvider: FC<{ children?: ReactNode }> = ({
  children
}) => {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [data, setData] = useState([])
  const [mode, setMode] = useState('')
  const [modal, setModal] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modals, setModals] = useState<string | null>('')
  const [selectedId, setSelectedId] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [filesArray, setFilesArray] = useState([])
  const [selectedFunc, setSelectedFunc] = useState(null)
  const [modalData, setModalData] = useState({ values: {}, selected: null })

  const handleModalClick = (values, selected) => {
    setModalData({ values, selected })
    onOpen()
  }
  const handleModalOpen = (_activeModal, _id, _data, _func) => {
    setModals(_activeModal)
    setSelectedId(_id)
    setSelectedData(_data)
    setSelectedFunc(_func)
    onOpen()
  }
  const handleModalClose = () => {
    setModals(null)
    setSelectedId(null)
    setSelectedData(null)
    setSelectedFunc(null)
    onOpen()
  }

  const handleClick = useCallback(
    (_modal, _data, _id, _mode) => {
      setModal(_modal)
      setData(_data)
      setId(_id)
      setMode(_mode)
      onOpen()
    },
    [onOpen]
  )

  return (
    <ComponentContext.Provider
      value={{
        loading,
        setLoading,
        modals,
        selectedId,
        isOpen,
        onClose,
        selectedData,
        setSelectedData,
        setFilesArray,
        filesArray,
        selectedFunc,
        modalData,
        handleModalClick,
        id,
        data,
        modal,
        mode,
        handleModalOpen,
        handleModalClose,
        handleClick
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}

ComponentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useComponent() {
  return React.useContext(ComponentContext)
}
