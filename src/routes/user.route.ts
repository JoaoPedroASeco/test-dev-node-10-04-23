import { userController } from '../app/controllers/User/UserController'
import express from 'express'

const userRoute = express()

userRoute.post('/users', userController.create)

export default userRoute
