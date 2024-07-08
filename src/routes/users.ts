import { Response, Router } from 'express'
import { getUserViewModel, HTTP_STATUSES } from '../utils'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types'
import { UserViewModel } from '../models/UserViewModel'
import { QueryUserModel } from '../models/QueryUserModel'
import { CreateUserModel } from '../models/CreateUserModel'
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel'
import { UpdateUserModel } from '../models/UpdateUserModel'
import { db } from '../db/db'


export const getUsersRoutes = Router({})


getUsersRoutes.get('/', (req: RequestWithQuery<QueryUserModel>,
                         res: Response<UserViewModel[]>) => {
  const name = req.query.name
  let foundUsers = db.users

  if (name) {
    foundUsers = foundUsers
      .filter(u => u.name.indexOf(name) > -1)
  }

  if (foundUsers.length === 0) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.send(foundUsers.map(getUserViewModel))
})

getUsersRoutes.get('/:id', (req: RequestWithParams<URIParamsUserIdModel>,
                            res: Response<UserViewModel>) => {
  const id = req.params.id
  const foundUser = db.users.find(u => u.id === +id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  res.json(getUserViewModel(foundUser))
})

getUsersRoutes.post('/', (req: RequestWithBody<CreateUserModel>,
                          res: Response<UserViewModel>) => {
  const name = req.body.name
  if (!name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const createdUser = {
    id: +(new Date()),
    name: name,
    secret: ''
  }

  db.users.push(createdUser)

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(getUserViewModel(createdUser))
})

getUsersRoutes.delete('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
  const id = req.params.id
  db.users = db.users.filter(u => u.id !== +id)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

getUsersRoutes.put('/:id', (req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>, res) => {
  const name = req.body.name
  if (!name) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return
  }

  const id = req.params.id
  const foundUser = db.users.find(u => u.id === +id)

  if (!foundUser) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  foundUser.name = name

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
