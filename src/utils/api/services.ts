/* eslint-disable @typescript-eslint/no-explicit-any */
import http from './http'
import { IFamily, IMember } from 'interfaces/auth.interface'

export const register = async (payload: Partial<IFamily>): Promise<any> =>
  await http.post({ url: '/user/signup/', body: JSON.stringify(payload) })

export const login = async (payload: Partial<IFamily>): Promise<any> =>
  await http.post({ url: '/user/login/', body: JSON.stringify(payload) })

export const getFamilyMembers = async (): Promise<IMember[]> =>
  await http.get({ url: '/user/family/' })

export const addFamilyMember = async (body): Promise<IMember> =>
  await http.post({ url: '/user/family/', body })

export const updateFamilyMember = async (id, body): Promise<IMember> =>
  await http.put({ url: `/user/family/${id}/`, body })

export const deleteFamilyMember = async (id): Promise<any> =>
  await http.delete({ url: `/user/family/${id}/` })

export const getMemories = async (): Promise<any> =>
  await http.get({ url: '/memories/memories/' })

export const saveMemory = async (payload: any): Promise<any> =>
  await http.post({ url: '/memories/memories/', body: payload })

export const getEvents = async (): Promise<any> =>
  await http.get({ url: '/user/events/' })

export const saveEvents = async (payload: any): Promise<any> =>
  await http.post({
    url: '/user/events/',
    body: payload
  })

export const profile = async (): Promise<IFamily[]> =>
  await http.get({ url: '/user/profile/' })

export const updateProfile = async (payload: FormData): Promise<IFamily[]> =>
  await http.put({ url: '/user/profile/', body: payload })
