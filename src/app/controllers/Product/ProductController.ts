// eslint-disable-next-line import/namespace
import Product from '../../schemas/product.schema'
import { CategoryType } from '../Category/CategoryController'
import { productUseCase } from './ProductUseCase'
import { Request, Response } from 'express'

export interface ProductType {
  _id?: string
  name: string
  categories: CategoryType[]
  qty: number
  price: number
  createdAt?: string
  updatedAt?: string
  __v?: number
}

class ProductController {
  // Create product
  async create(request: Request, response: Response) {
    const { name, categories, qty, price } = request.body

    try {
      const productAlredyExists = await Product.findOne({
        name
      })

      if (productAlredyExists) {
        return response.status(400).json('Product name already exists')
      }

      return response.status(201).json(
        await productUseCase.createProductMiddleware({
          name,
          categories,
          qty,
          price
        })
      )
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read all product
  async readAll(request: Request, response: Response) {
    try {
      return response
        .status(200)
        .json(await productUseCase.readAllProductMiddleware())
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read product by Id
  async readById(request: Request, response: Response) {
    const { _id } = request.params

    if (!_id || typeof _id !== 'string')
      return response.status(400).json('"_id" field is empty or incorrect')

    try {
      const product = await productUseCase.readByIdProductMiddleware({ _id })

      return response.status(200).json(product[0])
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Update product
  async update(request: Request, response: Response) {
    const { _id } = request.params
    const { name, categories, qty, price } = request.body

    try {
      const productAlredyExists = await Product.findById(_id)

      if (!productAlredyExists) {
        return response.status(404).json('Product not found')
      }
      return response.status(200).json(
        await productUseCase.updateProductMiddleware({
          _id,
          name,
          categories,
          qty,
          price
        })
      )
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Delete product
  async delete(request: Request, response: Response) {
    const { _id } = request.params

    try {
      const productAlredyExists = await Product.findById(_id)

      if (!productAlredyExists) {
        return response.status(404).json('Product not found')
      }

      await productUseCase.deleteProductMiddleware({ _id })

      return response.status(200).json('Product deleted successfully')
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }
}

export const productController = new ProductController()
