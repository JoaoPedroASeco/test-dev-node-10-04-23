import Product from '../../schemas/product.schema'
import { ProductType } from './ProductController'

class ProductUseCase {
  // Create a Product
  async createProductMiddleware({ name, categories, price, qty }: ProductType) {
    return await Product.create({ name, categories, price, qty })
  }

  // Read all Product
  async readAllProductMiddleware() {
    return await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      }
    ])
  }

  // Read Product by Id
  async readByIdProductMiddleware({ _id }: { _id: string }) {
    return await Product.aggregate([
      {
        $match: {
          $expr: { $eq: ['$_id', { $toObjectId: _id }] }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      }
    ])
  }

  // Update a Product
  async updateProductMiddleware({
    _id,
    name,
    categories,
    price,
    qty
  }: ProductType) {
    try {
      await Product.updateOne({ _id }, { name, categories, price, qty })

      return await await Product.findById({ _id })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Delete a Product
  async deleteProductMiddleware({ _id }: { _id: string }) {
    return await Product.deleteOne({ _id })
  }
}

export const productUseCase = new ProductUseCase()
