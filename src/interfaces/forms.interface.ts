/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOption {
  id: number
  name: string
}

export interface IOptions<T> {
  options: T[]
}

export interface IFormProps {
  label?: string
  value?: any
  error?: string
  touched?: boolean
  required?: boolean
  setFieldTouched: any
}

export interface FilesProps {
  name?: string
  type?: string
  path?: string
  preview?: string
}
