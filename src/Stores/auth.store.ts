/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import { login, register } from 'Utils/Api/services'
import { IUser } from 'Interfaces/auth.interface'

interface IAuthStore {
  isLoading: boolean
  user?: IUser | null
  token?: string | null
  error?: string | null
  message?: string | null
  login: (p: IUser) => Promise<void>
  register: (p: Partial<IUser>) => Promise<void>
}

export const authStore = create<IAuthStore>(set => ({
  user: null,
  token: JSON.parse(localStorage.getItem('mY-dC_f=T') || 'null'),
  error: null,
  message: null,
  isLoading: false,
  login: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const {
        message,
        result: { user, token }
      } = await login(payload)
      set(() => ({ isLoading: false, user, token, message }))
    } catch (err: any) {
      let error = 'Unexpected network error.'
      if (err.status === 500) {
        error = err?.message
      }
      if (err.status === 400 && err?.data?.errors) {
        error = Object.values(err?.data?.errors).join(' <br /> ')
      }
      set(() => ({ isLoading: false, error }))
    }
  },
  register: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const { message } = await register(payload)
      set(() => ({ isLoading: false, message }))
    } catch (err: any) {
      let error = 'Unexpected network error.'
      if (err.status === 500) {
        error = err?.message
      }
      if (err.status === 400 && err?.data?.errors) {
        error = Object.values(err?.data?.errors).join(' <br /> ')
      }
      set(() => ({ isLoading: false, error }))
    }
  }
}))
