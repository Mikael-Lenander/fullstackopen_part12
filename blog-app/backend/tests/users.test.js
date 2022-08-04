const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { initialUsers, getUsersFromDB, createUsers } = require('./test_helper').users
jest.setTimeout(10000)

const api = supertest(app)

const newUser = {
    username: 'velimatti',
    name: 'veli',
    password: 'salasana'
}
const userWithoutPassword = {
    username: 'abc',
    name: 'abcd'
}
const userWithShortPassword = {
    ...newUser,
    password: '12'
}

beforeEach(async () => {
    await User.deleteMany({})
    await createUsers(api, initialUsers)
})

describe('create user', () => {
    test('user with valid credentials is added to database', async () => {
        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const users = await getUsersFromDB()
        expect(users).toHaveLength(initialUsers.length + 1)
    })

    test('when username is taken responds with error', async () => {
        const response = await api.post('/api/users')
            .send(initialUsers[0])
            .expect(400)
        expect(response.body.error).toContain('taken')

        const users = await getUsersFromDB()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('when credentials are omitted responds with error', async () => {
        const response = await api.post('/api/users')
            .send(userWithoutPassword)
            .expect(400)
        expect(response.body.error).toContain('Credentials')

        const users = await getUsersFromDB()
        expect(users).toHaveLength(initialUsers.length)
    })

    test('when password is too short responds with error', async () => {
        const response = await api.post('/api/users')
            .send(userWithShortPassword)
            .expect(400)
        expect(response.body.error).toContain('3 characters')

        const users = await getUsersFromDB()
        expect(users).toHaveLength(initialUsers.length)
    })
})

afterAll(done => {
    mongoose.connection.close()
    done()
})