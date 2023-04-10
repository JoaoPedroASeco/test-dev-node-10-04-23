import mongoose from '../utils/db'

class BaseSchema extends mongoose.Schema {
  constructor(definition: any) {
    super({
      ...definition,
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    })
  }
}

export default BaseSchema
