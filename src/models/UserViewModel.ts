export type ErrorMessage = {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export type UserViewModel = {
  id?: number
  name?: string
  message?: string
  errors?: ErrorMessage[]
}
