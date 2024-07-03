import { UserType } from './db/db'
import { UserViewModel } from './models/UserViewModel'

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

export const getUserViewModel = (user: UserType): UserViewModel => {
  return {
    id: user.id,
    name: user.name
  }
}
