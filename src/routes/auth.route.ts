import { authenticateUserController } from '../app/controllers/UserAuth/UserAuthController'
import express from 'express'

const authRoute = express()

authRoute.post('/auth/login', authenticateUserController.login)

export default authRoute
