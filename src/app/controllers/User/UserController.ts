import { Request, Response } from 'express'
import User from '../../schemas/user.schema'
import { userUseCase } from './UserUseCase'

export interface UserType {
  _id?: string
  name: string
  email: string
  password: string
  refresh_token?: string
  createdAt?: string
  updatedAt?: string
}

class UserController {
  // Create user
  async create(request: Request, response: Response) {
    const { email, name, password } = request.body

    try {
      const emailAlredyExists = await User.findOne({
        email
      })

      if (emailAlredyExists) {
        return response.status(400).json('User email already exists')
      }

      const nameAlredyExists = await User.findOne({
        name
      })

      if (nameAlredyExists) {
        return response.status(400).json('User name already exists')
      }

      if (!password) {
        return response
          .status(400)
          .json(
            'User validation failed: password: Path `password` is required.'
          )
      }

      const user = await userUseCase.createUserMiddleware({
        name,
        email,
        password
      })

      return response.status(201).send(user)
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read all user
  async readAll(request: Request, response: Response) {
    try {
      return response
        .status(200)
        .json(await userUseCase.readAllUserMiddleware())
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read user by Id
  async readById(request: Request, response: Response) {
    const { _id } = request.params

    console.log(_id)

    if (!_id || typeof _id !== 'string')
      return response.status(400).json('"_id" field is empty or incorrect')

    try {
      return response
        .status(200)
        .json(await userUseCase.readByIdUserMiddleware({ _id }))
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Update user
  async update(request: Request, response: Response) {
    const { _id, name, email, password } = request.body

    try {
      return response.status(200).json(
        await userUseCase.updateUserMiddleware({
          _id,
          name,
          email,
          password
        })
      )
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Delete user
  async delete(request: Request, response: Response) {
    const { _id } = request.body

    try {
      return response
        .status(201)
        .json(await userUseCase.deleteUserMiddleware({ _id }))
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Create user mockup
  async createUserMockup(request: Request, response: Response) {
    const userAlreadyExists = await User.find({ email: 'user@gmail.com' })

    if (userAlreadyExists.length > 0)
      return response.status(403).send('User mockup already created!')

    try {
      await userUseCase.createUserMiddleware({
        name: 'User',
        email: 'user@gmail.com',
        password: '123'
      })

      return response.status(200).send('User mockup created!')
    } catch (error) {
      return error
    }
  }
}

export const userController = new UserController()
