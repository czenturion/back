import request from 'supertest'
import { app, db, HTTP_STATUSES } from '../../src'


describe('/users',() => {

  beforeAll(async () => {
    await request(app)
      .delete('/__test__/data')
  })

  it('should return 200 and db.users', async () => {
    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.NOT_FOUND_404, {})
  })

  it('should return 404 for not existing user', async () => {
    await request(app)
      .get('/users/1')
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

  it('shouldn`t create user with incorrect data', async () => {
    await request(app)
      .post('/users')
      .send({ name: '' })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

  let createdUser: any = null
  it('should create user with correct data', async () => {
    const createdResponse = await request(app)
      .post('/users')
      .send({ name: 'czntrn' })
      .expect(HTTP_STATUSES.CREATED_201)

    createdUser = createdResponse.body

    expect(createdUser)
      .toEqual({
        id: expect.any(Number),
        name: 'czntrn'
      })

    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.OK_200, [createdUser])
  })

  it('shouldn`t update user with incorrect input data', async () => {
    await request(app)
      .put('/users' + createdUser.id)
      .send({ name: '' })
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

})