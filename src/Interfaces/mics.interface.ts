export interface IResponse<T> {
  result: T
  message?: string
  code: number
}

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface INavMenu {
  title: string
  link?: string
  disable?: string
}
