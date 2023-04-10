import BaseSchema from '../core/base.schema'
import mongoose from '../utils/db'

const RefreshTokenSchema = new BaseSchema({
  expiresIn: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userId: {
    type: String
  }
})

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

export default RefreshToken
