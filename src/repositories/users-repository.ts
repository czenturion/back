import { db } from '../db/db'

export const usersRepository = {

  findAllUsersOrByName(name: string | null | undefined) {
    if (name) {
      const filteredUsers = db.users.filter(u => u.name.indexOf(name) > -1)
      return filteredUsers
    } else {
      return db.users
    }
  },

  findUserById(id: number) {
    return db.users.find(u => u.id === +id)
  },

  createUser(name: string) {
    const createdUser = {
      id: +(new Date()),
      name: name,
      secret: ''
    }
    db.users.push(createdUser)
    return createdUser
  },

  updateUser(id: number, name: string) {
    if (name.length > 0) {
      let user = db.users.find(u => u.id === id)

      if (user) {
        user.name = name
        return true
      } else {
        return false
      }
    }
  },

  deleteUser(id: number) {
    for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].id === id) {
        db.users.splice(i, 1)
        return true
      }
    }
    return false
  }
}