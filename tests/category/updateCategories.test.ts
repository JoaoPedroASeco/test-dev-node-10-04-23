import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Category from '../../src/app/schemas/category.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Update a Category', () => {
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

  describe('PATCH /categories', () => {
    it('should update a category', async () => {
      const { body } = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      const res = await chai
        .request(app)
        .patch(`/categories/${body._id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 11'
        })

      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal('test Category 11')
    })

    it('should not update a category when passing a unexistent _id', async () => {
      const res = await chai
        .request(app)
        .patch('/categories/642dec2ab0c8df20822c7123')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          price: 200000
        })

      expect(res.status).to.equal(404)
      expect(res.body).to.equal('Category not found')
    })
  })
})
