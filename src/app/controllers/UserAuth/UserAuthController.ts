import { Request, Response } from 'express'
import { authenticateUserUseCase } from './UserAuthUseCase'
import User from '../../schemas/user.schema'
import { compare } from 'bcryptjs'

class AuthenticateUserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        email
      })

      if (!user)
        return res.status(400).json(`Not Authorized: Invalid email address`)

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch)
        return res.status(400).json(`Not Authorized: Invalid password`)

      const token = await authenticateUserUseCase.execute({
        user
      })

      return res.status(200).json(token)
    } catch (error: any) {
      return res.status(400).json(`Not Authorized: ${error.message}`)
    }
  }
}

export const authenticateUserController = new AuthenticateUserController()
