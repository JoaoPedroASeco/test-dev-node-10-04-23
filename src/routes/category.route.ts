import { categoryController } from '../app/controllers/Category/CategoryController'
import express from 'express'
import { ensureAuthenticated } from '../app/utils/middleware/ensureAuthenticated'

const categoryRoute = express()

categoryRoute.use(ensureAuthenticated)

categoryRoute.post('/categories', categoryController.create)

categoryRoute.get('/categories', categoryController.readAll)

categoryRoute.get('/categories/:_id', categoryController.readById)

categoryRoute.patch('/categories/:_id', categoryController.update)

categoryRoute.delete('/categories/:_id', categoryController.delete)

export default categoryRoute
