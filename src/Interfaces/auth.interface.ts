export interface IUser {
  email: string
  firstName: string
  lastName: string
  password?: string
  phoneNumber: string
  gender?: string
  address?: string
  occupation?: string
  dob?: string
  race?: string
  country?: string
  tribe?: string
  religion?: string
}

export interface IAuthData {
  token: string
  user: IUser
}

export interface IAuthContext {
  show: boolean
  token: string
  isAccepted: boolean
  isLoading?: boolean
  login: (p: Partial<IUser>) => Promise<void>
  register: (p: Partial<IUser>) => Promise<void>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>
}
