import express, { Request, Response } from 'express'

//mocks
import { users } from '../app/utils/mocks/users.mock'
import { products } from '../app/utils/mocks/products.mock'
import { categories } from '../app/utils/mocks/categories.mock'

// Schemas
import User from '../app/schemas/user.schema'
import Product from '../app/schemas/product.schema'
import Category from '../app/schemas/category.schema'

const mockRoute = express()

mockRoute.post('/mocks', async (request: Request, response: Response) => {
  try {
    await User.create(users)
    await Product.create(products)
    await Category.create(categories)

    return response.status(201).json('All data mocks are successfully created!')
  } catch (error: any) {
    return response.status(400).json(error.message)
  }
})

export default mockRoute
