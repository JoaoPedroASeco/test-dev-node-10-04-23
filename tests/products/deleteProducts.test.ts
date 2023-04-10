import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Product from '../../src/app/schemas/product.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Delete a Product', () => {
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
    await Product.deleteMany({ name: /test/ })
  })

  after(async () => {
    await close()
  })

  describe('DELETE /products', () => {
    it('should delete a product', async () => {
      const { body } = await chai
        .request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Product 10',
          qty: 100,
          price: 100000,
          categories: []
        })

      const res = await chai
        .request(app)
        .delete(`/products/${body._id}`)
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(200)
      expect(res.body).to.equal('Product deleted successfully')
    })

    it('should not delete a product when passing a unexistent _id', async () => {
      const res = await chai
        .request(app)
        .delete('/products/642dec2ab0c8df20822c7123')
        .set({ Authorization: `Bearer ${token}` })

      expect(res.status).to.equal(404)
      expect(res.body).to.equal('Product not found')
    })
  })
})
