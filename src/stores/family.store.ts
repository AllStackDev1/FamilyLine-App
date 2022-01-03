/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import { addFamilyMembers } from 'utils/api/services'

interface IFamilyStore {
  view: Views
  isLoading: boolean
  error?: string | null
  message?: string | null
  selectedData?: {
    gender: 'Male' | 'Female'
    mainId: string
    rel: string
  }
  addFamilyMembers: (p: any) => Promise<void>
}

type Views = 'table' | 'tree'

export const familyStore = create<IFamilyStore>(set => ({
  error: null,
  message: null,
  view: 'table',
  isLoading: false,
  addFamilyMembers: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const member = await addFamilyMembers(payload)
      if (member.id) {
        set(() => ({
          isLoading: false,
          message: 'Family member added successfully'
        }))
      }
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
      if (err.status === 401) {
        localStorage.clear()
        window.location.reload()
      }
      set(() => ({ isLoading: false, error }))
    }
  }
}))
