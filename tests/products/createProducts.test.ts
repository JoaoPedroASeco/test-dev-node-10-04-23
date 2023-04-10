import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Product from '../../src/app/schemas/product.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Create a Product', () => {
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

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const res = await chai
        .request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Product 10',
          qty: 100,
          price: 100000,
          categories: []
        })

      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal('test Product 10')
      expect(res.body.qty).to.equal(100)
      expect(res.body.price).to.equal(100000)
      expect(res.body.categories).length(0)
    })

    it('should not create a product with existent name', async () => {
      await chai
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
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Product 10',
          qty: 100,
          price: 100000,
          categories: []
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('Product name already exists')
    })

    it('should not create a product with null name field', async () => {
      const res = await chai
        .request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: null,
          qty: 100,
          price: 100000,
          categories: []
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'Product validation failed: name: Path `name` is required.'
      )
    })

    it('should not create a product with null qty field', async () => {
      const res = await chai
        .request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'Product 11',
          qty: null,
          price: 100000,
          categories: []
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'Product validation failed: qty: Path `qty` is required.'
      )
    })

    it('should not create a product with null price field', async () => {
      const res = await chai
        .request(app)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'Product 11',
          qty: 100,
          price: null,
          categories: []
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'Product validation failed: price: Path `price` is required.'
      )
    })
  })
})
