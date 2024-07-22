import { Request, Response, NextFunction } from 'express'
import { Result, validationResult } from 'express-validator'
import { HTTP_STATUSES } from '../utils'

export const inputValidationMiddleware = (
  req: Request, res: Response, next: NextFunction
) => {
  const result: Result = validationResult(req)

  if (!result.isEmpty()) {
    res
      .status(HTTP_STATUSES.BAD_REQUEST_400)
      .send({ errors: result.array() })
    return
  } else {
    next()
  }
}