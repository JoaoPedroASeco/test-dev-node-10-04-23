import BaseSchema from '../core/base.schema'
import mongoose from '../utils/db'

const ProductSchema = new BaseSchema({
  categories: {
    type: [mongoose.Types.ObjectId],
    ref: 'Category',
    required: false,
    default: null
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
