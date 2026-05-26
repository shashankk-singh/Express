const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')

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

