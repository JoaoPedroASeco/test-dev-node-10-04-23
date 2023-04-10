import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Category from '../../src/app/schemas/category.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Delete a Category', () => {
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

  describe('DELETE /categories', () => {
    it('should delete a category', async () => {
      const { body } = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      const res = await chai
        .request(app)
        .delete(`/categories/${body._id}`)
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(200)
      expect(res.body).to.equal('Category deleted successfully')
    })

    it('should not delete a category when passing a unexistent _id', async () => {
      const res = await chai
        .request(app)
        .delete('/categories/642dec2ab0c8df20822c7123')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(404)
      expect(res.body).to.equal('Category not found')
    })
  })
})
