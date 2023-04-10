import Category from '../../schemas/category.schema'
import { CategoryType } from './CategoryController'

class CategoryUseCase {
  // Create a Category
  async createCategoryMiddleware({ name, parent }: CategoryType) {
    return await Category.create({ name, parent })
  }

  // Read all Category
  async readAllCategoryMiddleware() {
    return await Category.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'parent',
          foreignField: '_id',
          as: 'parent'
        }
      }
    ])
  }

  // Read Category by Id
  async readByIdCategoryMiddleware({ _id }: { _id: string }) {
    return await Category.aggregate([
      {
        $match: {
          $expr: { $eq: ['$_id', { $toObjectId: _id }] }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'parent',
          foreignField: '_id',
          as: 'parent'
        }
      }
    ])
  }

  // Update a Category
  async updateCategoryMiddleware({ _id, name, parent }: CategoryType) {
    try {
      await Category.updateOne({ _id }, { name, parent })

      return await await Category.findById({ _id })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Delete a Category
  async deleteCategoryMiddleware({ _id }: { _id: string }) {
    const categoryAlredyExists = await Category.findById(_id)

    if (!categoryAlredyExists) {
      return 'Category not found'
    }

    return await Category.deleteOne({ _id })
  }
}

export const categoryUseCase = new CategoryUseCase()
