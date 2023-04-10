import authRoute from './auth.route'
import categoryRoute from './category.route'
import productRoute from './product.route'
import userRoute from './user.route'
import mockRoute from './mock'

export const routes = [
  mockRoute,
  userRoute,
  authRoute,
  categoryRoute,
  productRoute
]
