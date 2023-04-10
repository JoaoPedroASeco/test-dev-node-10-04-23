import BaseSchema from '../core/base.schema'
import mongoose from '../utils/db'

const UserSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  refresh_token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RefreshToken',
    required: false,
    default: null
  }
})

const User = mongoose.model('User', UserSchema)

export default User
