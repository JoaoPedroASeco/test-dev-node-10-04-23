import BaseSchema from '../core/base.schema'
import mongoose from '../utils/db'

const CategorySchema = new BaseSchema({
  parent: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const Category = mongoose.model('Category', CategorySchema)

export default Category
