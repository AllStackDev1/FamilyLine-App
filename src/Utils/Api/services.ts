/* eslint-disable @typescript-eslint/no-explicit-any */
import http from './http'
// import { IResponse } from 'interfaces/mics.interface'
import { IUser } from 'interfaces/auth.interface'

export const register = async (payload: Partial<IUser>): Promise<any> =>
  await http.post({
    url: '/user/signup/',
    body: JSON.stringify(payload)
  })

export const login = async (payload: Partial<IUser>): Promise<any> =>
  await http.post({
    url: '/api/token/',
    body: JSON.stringify(payload)
  })

export const profile = async (): Promise<any> =>
  await http.get({ url: '/user/profile/' })
