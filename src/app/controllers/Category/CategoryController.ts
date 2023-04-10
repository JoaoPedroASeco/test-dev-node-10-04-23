import Category from '../../schemas/category.schema'
import { categoryUseCase } from './CategoryUseCase'
import { Request, Response } from 'express'

export interface CategoryType {
  _id?: string
  parent?: string | null
  name: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

class CategoryController {
  // Create category
  async create(request: Request, response: Response) {
    const { name, parent } = request.body

    try {
      const categoryAlredyExists = await Category.findOne({
        name
      })

      if (categoryAlredyExists) {
        return response.status(400).json('Category name already exists')
      }

      return response.status(201).json(
        await categoryUseCase.createCategoryMiddleware({
          name,
          parent
        })
      )
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read all category
  async readAll(request: Request, response: Response) {
    try {
      return response
        .status(200)
        .json(await categoryUseCase.readAllCategoryMiddleware())
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Read category by Id
  async readById(request: Request, response: Response) {
    const { _id } = request.params

    if (!_id || typeof _id !== 'string')
      return response.status(400).json('"_id" field is empty or incorrect')
    try {
      const category = await categoryUseCase.readByIdCategoryMiddleware({ _id })

      return response.status(200).json(category[0])
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Update category
  async update(request: Request, response: Response) {
    const { name, parent } = request.body
    const { _id } = request.params

    try {
      const productAlredyExists = await Category.findById(_id)

      if (!productAlredyExists) {
        return response.status(404).json('Category not found')
      }

      return response.status(200).json(
        await categoryUseCase.updateCategoryMiddleware({
          _id,
          name,
          parent
        })
      )
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }

  // Delete category
  async delete(request: Request, response: Response) {
    const { _id } = request.params

    try {
      const productAlredyExists = await Category.findById(_id)

      if (!productAlredyExists) {
        return response.status(404).json('Category not found')
      }

      await categoryUseCase.deleteCategoryMiddleware({ _id })

      return response.status(200).json('Category deleted successfully')
    } catch (error: any) {
      return response.status(400).json(error.message)
    }
  }
}

export const categoryController = new CategoryController()
