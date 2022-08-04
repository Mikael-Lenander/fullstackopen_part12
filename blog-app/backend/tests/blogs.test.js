const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { manyBlogs: initialBlogs, getBlogsFromDB } = require('./test_helper').blogs
const { initialUsers, loginUser, createUsers } = require('./test_helper').users
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
}
const newBlogWithNoLikes = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
}
const invalidNewBlog = {
    title: "React patterns",
    author: "Michael Chan",
}
const invalidNewBlog2 = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})


describe('get blog', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(initialBlogs.length)
    })

    test('blogs have paramater "id"', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body[0].id).toBeDefined()
    })
})

describe('post blog', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await createUsers(api, initialUsers)
    })

    test('a blog is properly added', async () => {
        const response = await loginUser(api, initialUsers[0])
        const token = response.body.token
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)

        const blogs = await getBlogsFromDB()
        expect(blogs).toHaveLength(initialBlogs.length + 1)
    })
    test('when no "likes" prop is omitted it defaults to 0', async () => {
        const response = await loginUser(api, initialUsers[0])
        const token = response.body.token
        const res = await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithNoLikes)
            .expect(201)

        const addedBlog = res.body
        expect(addedBlog.likes).toBe(0)
    })

    test('when "url" or "title" prop is omitted responds with error', async () => {
        const response = await loginUser(api, initialUsers[0])
        const token = response.body.token
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidNewBlog)
            .expect(400)
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidNewBlog2)
            .expect(400)

        const blogs = await getBlogsFromDB()
        expect(blogs).toHaveLength(initialBlogs.length)
    })

    test('when no access token is provided responds with error', async () => {
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogs = await getBlogsFromDB()
        expect(blogs).toHaveLength(initialBlogs.length)
    })

})

afterAll(done => {
    mongoose.connection.close()
    done()
})