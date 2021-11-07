/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDelete {
  url: string
}

export interface IPost extends IDelete {
  body?: string
}

export type IPatch = IPost

export type IPut = IPost

export interface IGet extends IDelete {
  query?: Record<string, any>
}
