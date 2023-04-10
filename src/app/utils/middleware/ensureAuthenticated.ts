import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }
  const [, token] = authToken.split(' ')

  try {
    verify(token, 'e6db8e57-a407-477b-9768-ef1a8650e79c')

    return next()
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid token'
    })
  }
}
