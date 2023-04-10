import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, 'e6db8e57-a407-477b-9768-ef1a8650e79c', {
      subject: userId,
      expiresIn: '3600s'
    })

    return token
  }
}

export { GenerateTokenProvider }
