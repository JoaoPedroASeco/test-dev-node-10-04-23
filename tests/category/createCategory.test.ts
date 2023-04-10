import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import Category from '../../src/app/schemas/category.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Create a Category', () => {
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

  describe('POST /categories', () => {
    it('should create a new category', async () => {
      const res = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal('test Category 10')
    })

    it('should not create a category with existent name', async () => {
      await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      const res = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'test Category 10'
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('Category name already exists')
    })

    it('should not create a category with null name field', async () => {
      const res = await chai
        .request(app)
        .post('/categories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: null
        })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'Category validation failed: name: Path `name` is required.'
      )
    })
  })
})
