import { GenerateRefreshToken } from '../../utils/providers/generateRefreshToken.provider'
import { GenerateTokenProvider } from '../../utils/providers/generateToken.provider'
import RefreshToken from '../../schemas/refreshToken.schema'

interface IRequest {
  user: any
}

class AuthenticateUserUseCase {
  async execute({ user }: IRequest) {
    const userId = user._id

    if (!userId) return 'User or password incorrect!'

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userId.toString())

    await RefreshToken.deleteMany({
      userId
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userId.toString())

    return { token, refreshToken }
  }
}

export const authenticateUserUseCase = new AuthenticateUserUseCase()
