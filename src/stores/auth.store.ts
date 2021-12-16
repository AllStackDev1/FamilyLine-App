/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import { login, register, updateProfile } from 'utils/api/services'
import { IFamily } from 'interfaces/auth.interface'

interface IAuthStore {
  isLoading: boolean
  family?: IFamily | null
  access?: string | null
  refresh?: string | null
  error?: string | null
  message?: string | null
  login: (p: Partial<{ email: string; password: string }>) => Promise<void>
  register: (p: IFamily) => Promise<void>
  updateProfile: (p: any) => Promise<void>
}

export const authStore = create<IAuthStore>(set => ({
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
      const family = await register(payload)
      set(() => ({ isLoading: false, family }))
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
  updateProfile: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const family = await updateProfile(payload)
      set(() => ({ isLoading: false, family: family[0] }))
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
