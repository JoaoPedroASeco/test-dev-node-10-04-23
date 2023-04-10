import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'

chai.use(chaiHttp)
const { expect } = chai

describe('Get All Products', () => {
  let token: string

  before(async () => {
    await connect()

    await chai.request(app).post('/users').send({
      name: 'test Jhon Doe',
      email: 'user@test.com',
      password: 'password'
    })

    const { body } = await chai.request(app).post('/auth/login').send({
      email: 'user@test.com',
      password: 'password'
    })

    token = body.token
  })

  after(async () => {
    await close()
  })

  describe('GET /products', () => {
    it('should return an array of all products', async () => {
      const res = await chai
        .request(app)
        .get('/products')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(200)
      expect(res.body).length.greaterThanOrEqual(7)
    })
  })
})
