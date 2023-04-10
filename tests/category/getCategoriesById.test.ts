import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Category from '../../src/app/schemas/category.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Get a Category by Id', () => {
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

  afterEach(async () => {
    await Category.deleteMany({ name: /test/ })
  })

  after(async () => {
    await close()
  })

  describe('GET /categories/:id', () => {
    it('should return an unique category', async () => {
      const { body } = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      const res = await chai
        .request(app)
        .get(`/categories/${body._id}`)
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal('test Category 10')
    })

    it('should return a void object when passing a unexistent id', async () => {
      const res = await chai
        .request(app)
        .get('/categories/642dec2ab0c8df20822c7123')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(200)
      expect(res.body).length(0)
    })
  })
})
