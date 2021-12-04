/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import { addFamilyMembers } from 'utils/api/services'

interface IFamilyStore {
  isLoading: boolean
  error?: string | null
  message?: string | null
  familyMembers: []
  addFamilyMembers: (p: any) => Promise<void>
}

export const familyStore = create<IFamilyStore>(set => ({
  error: null,
  message: null,
  isLoading: false,
  familyMembers: [],
  addFamilyMembers: async payload => {
    try {
      set(() => ({ isLoading: true, error: null, message: null }))
      const { members } = await addFamilyMembers(payload)
      set(() => ({ isLoading: false, familyMembers: members }))
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
