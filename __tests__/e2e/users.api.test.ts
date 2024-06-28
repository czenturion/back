import request from 'supertest'
import { app, db } from '../../src'


describe('/users',() => {

  it('should return 200 and db.users', async () => {
    await request(app)
      .get('/users')
      .expect(200, db.users)
  })

})