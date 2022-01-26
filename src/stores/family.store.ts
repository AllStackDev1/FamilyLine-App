/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand'
import {
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember
} from 'utils/api/services'
import { IMember } from 'interfaces/auth.interface'

interface IFamilyStore {
  view: Views
  modal: Modal
  isLoading: boolean
  error?: string | null
  message?: string | null
  selectedData?: {
    gender: 'Male' | 'Female'
    mainId: string
    rel: string
  }
  selectedMember?: IMember | null
  addFamilyMember: (p: any) => Promise<void>
  updateFamilyMember: (id: string, p: any) => Promise<void>
  deleteFamilyMember: (p: any) => Promise<void>
}

type Views = 'table' | 'tree'
type Modal = 'edit' | 'new' | 'prompt'

export const familyStore = create<IFamilyStore>(set => ({
  error: null,
  message: null,
  view: 'table',
  modal: 'prompt',
  isLoading: false,
  addFamilyMember: async payload => {
    try {
      set(() => ({ isLoading: true }))
      const member = await addFamilyMember(payload)
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
  },
  updateFamilyMember: async (id, payload) => {
    try {
      set(() => ({ isLoading: true }))
      const member = await updateFamilyMember(id, payload)
      if (member.id) {
        set(() => ({
          isLoading: false,
          message: 'Member updated successfully'
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
  },
  deleteFamilyMember: async payload => {
    try {
      set(() => ({ isLoading: true }))
      await deleteFamilyMember(payload)
      set(() => ({
        isLoading: false,
        message: 'Member deleted successfully'
      }))
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
