import { close, connect } from '../../src/app/utils/db'
import app from '../../src/server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import User from '../../src/app/schemas/user.schema'

chai.use(chaiHttp)
const { expect } = chai

describe('Create a User', () => {
  before(async () => {
    await connect()
  })

  afterEach(async () => {
    await User.deleteMany({ name: /test/ })
  })

  after(async () => {
    await close()
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const res = await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: 'test@example.com',
        password: 'password'
      })

      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal('test Jhon Doe 2')
      expect(res.body.email).to.equal('test@example.com')
    })

    it('should not create a user with existent email', async () => {
      await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 3',
        email: 'test@example.com',
        password: 'password'
      })

      const res = await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: 'test@example.com',
        password: 'password'
      })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('User email already exists')
    })

    it('should not create a user with existent name', async () => {
      await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: 'test@example.com',
        password: 'password'
      })

      const res = await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: 'test@example2.com',
        password: 'password'
      })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('User name already exists')
    })

    it('should not create a user with null name field', async () => {
      const res = await chai.request(app).post('/users').send({
        name: null,
        email: 'test@example.com',
        password: 'password'
      })
      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'User validation failed: name: Path `name` is required.'
      )
    })

    it('should not create a user with null email field', async () => {
      const res = await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: null,
        password: 'password'
      })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'User validation failed: email: Path `email` is required.'
      )
    })

    it('should not create a user with null password field', async () => {
      const res = await chai.request(app).post('/users').send({
        name: 'test Jhon Doe 2',
        email: 'test@example.com',
        password: null
      })

      expect(res.status).to.equal(400)
      expect(res.body).to.equal(
        'User validation failed: password: Path `password` is required.'
      )
    })
  })
})
