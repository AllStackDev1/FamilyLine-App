export interface IMember {
  id: string
  avatar?: {
    id: number
    image: string
    created_at: string
  }[]
  first_name: string
  last_name: string

  email?: string
  phonenumber: string

  race?: string
  main: boolean
  tribe?: string
  mother?: string
  father?: string
  gender?: string
  address?: string
  country?: string
  religion?: string
  spouses?: string[]
  children?: string[]
  occupation?: string
  date_of_birth?: string
}

export interface IFamily {
  id: string
  phonenumber: string
  family_name: string
  password: string
  avatar?: string
  email: string
}

export interface IAuthData {
  token: string
  user: IFamily
}

export interface IAuthContext {
  show: boolean
  isAccepted: boolean
  isLoading: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IGraphData {
  id: string
  main: boolean
  rels: {
    father: string
    mother: string
    spouses: string[]
    children: string[]
  }
  data: {
    first_name: string
    last_name: string
    date_of_birth: string
    avatar: any
    gender: string
  }
}
