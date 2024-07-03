export type UserType = {
  id: number
  name: string
  secret: string
}

export type DBType = {
  users: UserType[]
}

export const db: DBType = {
  users: [
    { id: 1, name: 'first', secret: 'qwerty' },
    { id: 2, name: 'second', secret: 'qwerty' },
    { id: 3, name: 'third', secret: 'qwerty' },
    { id: 4, name: 'fourth', secret: 'qwerty' }
  ]
}