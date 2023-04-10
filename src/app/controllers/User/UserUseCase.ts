import { hash } from 'bcryptjs'
import User from '../../schemas/user.schema'
import { UserType } from './UserController'

interface IUserRequest {
  name: string
  email: string
  password: string
}

class UserUseCase {
  async createUserMiddleware({ name, email, password }: IUserRequest) {
    // Cadastra o usuario
    const passwordHash = await hash(password, 8)

    const user = await User.create({
      name,
      email,
      password: passwordHash
    })

    return user
  }
  // Read all User
  async readAllUserMiddleware() {
    return await User.find()
  }

  // Read User by Id
  async readByIdUserMiddleware({ _id }: { _id: string }) {
    return await User.findOne({ _id })
  }

  // Update a User
  async updateUserMiddleware({ _id, name, email, password }: UserType) {
    const categoryAlredyExists = await User.findById(_id)

    if (!categoryAlredyExists) {
      return 'User not found'
    }

    return await User.updateOne({ _id }, { name, email, password })
  }

  // Delete a User
  async deleteUserMiddleware({ _id }: { _id: string }) {
    const categoryAlredyExists = await User.findById(_id)

    if (!categoryAlredyExists) {
      return 'User not found'
    }

    return await User.deleteOne({ _id })
  }
}

export const userUseCase = new UserUseCase()
