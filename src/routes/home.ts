import { Router } from 'express'
import path from 'path'
import { HTTP_STATUSES } from '../utils'


export const getHomeRoutes = () => {

  const router = Router()

  router.get('/', (req,
                   res) => {
    res
      .status(HTTP_STATUSES.OK_200)
      .sendFile(path.join(__dirname, 'pages', 'home.html'))
  })

  return router
}
