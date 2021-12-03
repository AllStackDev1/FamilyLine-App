/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import { login, register } from 'Utils/Api/services'
import { IUser, IFamily } from 'Interfaces/auth.interface'

interface IAuthStore {
  isLoading: boolean
  user?: IUser | null
  access?: string | null
  refresh?: string | null
  error?: string | null
  message?: string | null
  login: (p: Partial<IUser>) => Promise<void>
  register: (p: IFamily) => Promise<void>
}

export const authStore = create<IAuthStore>(set => ({
  user: JSON.parse(localStorage.getItem('_fl_u_U') || 'null'),
  access: localStorage.getItem('_fl_u_T'),
  refresh: localStorage.getItem('_fl_u_R'),
  error: null,
  message: null,
  isLoading: false,
  login: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const { access, refresh } = await login(payload)
      localStorage.setItem('_fl_u_T', access)
      localStorage.setItem('_fl_u_R', refresh)
      set(() => ({ isLoading: false, access, refresh }))
    } catch (err: any) {
      let error = 'Unexpected network error.'
      if (err.status === 500) {
        error = err?.message
      }
      if (err.status === 400 && err?.data) {
        error = Object.values(err.data)
          .map((e: any) => e[0])
          .join(' <br /> ')
      }
      set(() => ({ isLoading: false, error }))
    }
  },
  register: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const user = await register(payload)
      set(() => ({ isLoading: false, user }))
    } catch (err: any) {
      let error = 'Unexpected network error.'
      if (err.status === 500) {
        error = err?.message
      }
      if (err.status === 400 && err?.data) {
        error = Object.values(err.data)
          .map((e: any) => e[0])
          .join(' <br /> ')
      }
      set(() => ({ isLoading: false, error }))
    }
  }
}))
