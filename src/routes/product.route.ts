import { productController } from '../app/controllers/Product/ProductController'
import express from 'express'
import { ensureAuthenticated } from '../app/utils/middleware/ensureAuthenticated'

const productRoute = express()

productRoute.use(ensureAuthenticated)

productRoute.post('/products', productController.create)

productRoute.get('/products', productController.readAll)

productRoute.get('/products/:_id', productController.readById)

productRoute.patch('/products/:_id', productController.update)

productRoute.delete('/products/:_id', productController.delete)

export default productRoute
