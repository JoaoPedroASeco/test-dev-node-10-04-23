import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import User from '../../src/app/schemas/user.schema'
import { UserType } from '../../src/app/controllers/User/UserController'

chai.use(chaiHttp)
const { expect } = chai

describe('Make login with a User', () => {
  let user: UserType

  before(async () => {
    await connect()

    const { body } = await chai.request(app).post('/users').send({
      name: 'test Jhon Doe',
      email: 'test@example.com',
      password: 'password'
    })

    user = body
  })

  afterEach(async () => {
    await User.deleteMany({ name: /test/ })
  })

  after(async () => {
    await close()
  })

  describe('POST /auth/login', () => {
    it('should login with a user', async () => {
      const res = await chai.request(app).post('/auth/login').send({
        email: user.email,
        password: 'password'
      })

      expect(res.status).to.equal(200)
    })

    it('should not login with a wrong user email', async () => {
      const res = await chai.request(app).post('/auth/login').send({
        email: 'test@wrong.com',
        password: 'password'
      })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('Not Authorized: Invalid email address')
    })
  })
})
