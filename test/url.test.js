import app from '../src/app'
import request from 'supertest'
import prisma from '../src/db'

afterAll(async () => {
  await prisma.url.delete({
    where: {
      originalUrl: 'https://www.wikipedia.org'
    }
  })
})

describe('url short routes', () => {
  test('POST root deberia acortar una url', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'https://www.wikipedia.org'
      })
  
  expect(response.status).toEqual(200)
  expect(response.body).toHaveProperty('originalUrl')
  expect(response.body).toHaveProperty('urlShorted')

  })
})
