export interface IUser {
  avatar?: string
  email: string
  firstname: string
  lastname: string
  password?: string
  phonenumber: string
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
  isAccepted: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>
}
