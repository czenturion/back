import { Response, Router } from 'express'
import { body } from 'express-validator'
import { getUserViewModel, HTTP_STATUSES } from '../utils'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types'
import { UserViewModel } from '../models/UserViewModel'
import { QueryUserModel } from '../models/QueryUserModel'
import { CreateUserModel } from '../models/CreateUserModel'
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel'
import { UpdateUserModel } from '../models/UpdateUserModel'
import { usersRepository } from '../repositories/users-repository'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'


export const getUsersRoutes = Router({})

const nameValidation = body('name')
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('Name should be from 3 to 10 symbols')

getUsersRoutes.get('/',(
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

getUsersRoutes.post('/', nameValidation, inputValidationMiddleware, (
  req: RequestWithBody<CreateUserModel>,
  res: Response<UserViewModel>
) => {

  const createdUser = usersRepository.createUser(req.body.name)

  res
    .sendStatus(HTTP_STATUSES.CREATED_201)
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

getUsersRoutes.put('/:id', nameValidation, inputValidationMiddleware, (
  req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>,
  res
) => {

  const isUpdated = usersRepository.updateUser(+req.params.id, req.body.name)

  if (isUpdated) {
    const user = usersRepository.findUserById(+req.params.id)

    if (user) {
      res.send(getUserViewModel(user!))
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
  } else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
  }
})
