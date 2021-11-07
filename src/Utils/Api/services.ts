import axios from './axios'
import { IResponse } from 'Interfaces/mics.interface'
import { IUser, IAuthData } from 'Interfaces/auth.interface'

export const register = async (
  payload: Partial<IUser>
): Promise<IResponse<null>> =>
  await axios.post({ url: '/register', body: JSON.stringify(payload) })

export const login = async (
  payload: Partial<IUser>
): Promise<IResponse<IAuthData>> =>
  await axios.post({ url: '/login', body: JSON.stringify(payload) })
