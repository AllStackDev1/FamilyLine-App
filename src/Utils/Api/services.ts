/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'Utils/Api/http'
// import { IResponse } from 'interfaces/mics.interface'
import { IUser, IFamily } from 'Interfaces/auth.interface'

export const register = async (payload: IFamily): Promise<any> =>
  await http.post({
    url: '/user/signup/',
    body: JSON.stringify(payload)
  })

export const login = async (payload: Partial<IUser>): Promise<any> =>
  await http.post({
    url: '/user/login/',
    body: JSON.stringify(payload)
  })

export const familyMembers = async (): Promise<any> =>
  await http.get({
    url: '/user/family/'
  })

export const saveMemory = async (payload: any): Promise<any> =>
  await http.post({
    url: '/memories/memories/',
    body: payload
  })

export const profile = async (): Promise<any> =>
  await http.get({ url: '/user/profile/' })
