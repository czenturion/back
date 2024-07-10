import { Response, Router } from 'express'
import { getUserViewModel, HTTP_STATUSES } from '../utils'
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery
} from '../types'
import { UserViewModel } from '../models/UserViewModel'
import { QueryUserModel } from '../models/QueryUserModel'
import { CreateUserModel } from '../models/CreateUserModel'
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel'
import { UpdateUserModel } from '../models/UpdateUserModel'
import { usersRepository } from '../repositories/users-repository'


export const getUsersRoutes = Router({})


getUsersRoutes.get('/', (
  req: RequestWithQuery<QueryUserModel>,
  res: Response<UserViewModel[]>
) => {

  const foundUsers = usersRepository.findAllUsersOrByName(req.query.name?.toString())

  if (foundUsers.length === 0) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(foundUsers.map(getUserViewModel))
})

getUsersRoutes.get('/:id', (
  req: RequestWithParams<URIParamsUserIdModel>,
  res: Response<UserViewModel>
) => {

  const foundUser = usersRepository.findUserById(+req.params.id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.json(getUserViewModel(foundUser))
})

getUsersRoutes.post('/', (
  req: RequestWithBody<CreateUserModel>,
  res: Response<UserViewModel>
) => {

  const name = req.body.name
  if (!name.trim()) {
    res
      .status(HTTP_STATUSES.BAD_REQUEST_400)
      .json({ message: 'Name is required' })
    return
  }

  const createdUser = usersRepository.createUser(name)

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(getUserViewModel(createdUser))
})

getUsersRoutes.delete('/:id', (
  req: RequestWithParams<URIParamsUserIdModel>,
  res
) => {

  const isDeleted = usersRepository.deleteUser(+req.params.id)
  if (isDeleted) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})

getUsersRoutes.put('/:id', (
  req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>,
  res
) => {

  const isUpdated = usersRepository.updateUser(+req.params.id, req.body.name)

  if (isUpdated) {
    const user = usersRepository.findUserById(+req.params.id)
    res.send(user)
  } else {
    res.send(HTTP_STATUSES.NOT_FOUND_404)
  }
})
