import request from 'supertest'
import { CreateUserModel } from '../../src/models/CreateUserModel'
import { UpdateUserModel } from '../../src/models/UpdateUserModel'
import { app } from '../../src/app'
import { HTTP_STATUSES } from '../../src/utils'


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

    const name: CreateUserModel = { name: '' }

    await request(app)
      .post('/users')
      .send(name)
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

  let createdUser1: any = null

  it('should create user with correct data', async () => {

    const name: CreateUserModel = { name: 'czntrn1' }

    const createdResponse = await request(app)
      .post('/users')
      .send(name)
      .expect(HTTP_STATUSES.CREATED_201)

    createdUser1 = createdResponse.body

    expect(createdUser1)
      .toEqual({
        id: expect.any(Number),
        name: name.name
      })

    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.OK_200, [createdUser1])
  })

  let createdUser2: any = null

  it('should create user with correct data', async () => {

    const name: CreateUserModel = { name: 'czntrn2' }

    const createdResponse = await request(app)
      .post('/users')
      .send(name)
      .expect(HTTP_STATUSES.CREATED_201)

    createdUser2 = createdResponse.body

    expect(createdUser2)
      .toEqual({
        id: expect.any(Number),
        name: name.name
      })

    await request(app)
      .get('/users')
      .expect(HTTP_STATUSES.OK_200, [createdUser1, createdUser2])
  })

  it('shouldn`t update user with incorrect input data', async () => {

    const name: Omit<UpdateUserModel, 'id'> = { name: '' }

    await request(app)
      .put('/users/' + createdUser1.id)
      .send(name)
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get('/users')
      .expect(200, [createdUser1, createdUser2])
  })

  it('shouldn`t update user that not exist', async () => {

    const name: Omit<UpdateUserModel, 'id'> = { name: 'czntrn' }

    await request(app)
      .put('/users/' + -100)
      .send(name)
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

  it('should update user with correct input data', async () => {

    const name: Omit<UpdateUserModel, 'id'> = { name: 'cczznnttrrnn' }

    await request(app)
      .put('/users/' +  createdUser1.id)
      .send(name)
      .expect(HTTP_STATUSES.NO_CONTENT_204)

    createdUser1.name = name.name

    await request(app)
      .get('/users/' + createdUser1.id)
      .expect(HTTP_STATUSES.OK_200, createdUser1)

    await request(app)
      .get('/users/' + createdUser2.id)
      .expect(HTTP_STATUSES.OK_200, createdUser2)
  })

  it('should delete both users', async () => {

    await request(app)
      .delete('/users/' + createdUser1.id)
      .expect(HTTP_STATUSES.NO_CONTENT_204)

    await request(app)
      .get('/users/' + createdUser1.id)
      .expect(HTTP_STATUSES.NOT_FOUND_404)

    await request(app)
      .delete('/users/' + createdUser2.id)
      .expect(HTTP_STATUSES.NO_CONTENT_204)

    await request(app)
      .get('/users/')
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

})