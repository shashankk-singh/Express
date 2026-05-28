const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')
const User = require('./user')
const { put } = require('./auth')

beforeAll(async() => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET /', () => {
  it('should return 200 and welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})

describe('GET /about', () => {
  it('should return 200 and about info', async () => {
    const res = await request(app).get('/about')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('name')
  })
})

describe('POST /auth/register' , () => {
    it('should return 201 and register the user' , async() => {
        const res = await request(app).post('/auth/register')
        .send({ name: 'TestUser', email: 'test@test.com', password: '123456', role: 'user' })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('message')
    })
})

describe('PUT /users', () => {
  it('should return 200 and update the user', async () => {
    // first create a user
    const newUser = await User.create({ name: 'TestUser', email: 'put@test.com', password: '123456', role: 'user' })
    const id = newUser._id
    const res = await request(app).put(`/users/${id}`)
      .send({ name: 'UpdatedUser', role: 'user' })
    expect(res.statusCode).toBe(200)
    expect(res.body.details.name).toBe('UpdatedUser')
  })
  it ('should return 404 and user not found'  , async() => {
  const fakeId = '000000000000000000000000'
  const res = await request(app).put(`/users/${fakeId}`)
  expect(res.statusCode).toBe(404)
})
})

describe('DELETE /user' , () => {
  it ('should return 200 and User deleted successfully' , async() => {
    const newUser = await User.create({ name: 'TestUser', email: 'del@test.com', password: '123456', role: 'user' })
    const id = newUser._id
    const res = await request(app).delete(`/users/${id}`)
    expect(res.statusCode).toBe(200)
  })
it ('should return 404 and user not found'  , async() => {
  const fakeId = '000000000000000000000000'
  const res = await request(app).delete(`/users/${fakeId}`)
  expect(res.statusCode).toBe(404)
})
})