import express from 'express'
import { DBType } from '../db/db'
import { HTTP_STATUSES } from '../utils'


export const getTestsRoutes = (db: DBType) => {

  const router = express.Router()

  router.delete('/data', (req, res) => {
    db.users = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  })

  return router
}
