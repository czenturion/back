import { Router } from 'express'
import { db } from '../db/db'
import { HTTP_STATUSES } from '../utils'


export const getTestsRoutes = Router({})

getTestsRoutes.delete('/data', (req, res) => {
  db.users = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

