import express, { NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose'
import 'express-async-errors'
import { routes } from './routes'
import cors from 'cors'

const port = process.env.PORT ? process.env.PORT : 3333
const host = process.env.HOST ? process.env.HOST : 'localhost'

const app = express()

app.use(express.json())

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 })) // Set you front end domain

app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: 'Error',
      message: error.message
    })
  }
)

app.get('/', (req, res) => {
  return res.status(200).send('Hello World!')
})

app.listen(port, () =>
  console.log(`Server is now runing: http://${host}:${port}`)
)

export default app
