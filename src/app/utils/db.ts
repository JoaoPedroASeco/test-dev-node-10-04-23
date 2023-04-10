// Import Mongoose
import mongoose from 'mongoose'

const DATABASE_URL = 'mongodb://127.0.0.1:27017/node-test' // replace to process.env.DATABASE_URL

// Database Config
mongoose.connect(DATABASE_URL)
mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise

async function connect() {
  await mongoose.connect(DATABASE_URL)
}

async function close() {
  await mongoose.connection.close()
}

export default mongoose

export { connect, close }
