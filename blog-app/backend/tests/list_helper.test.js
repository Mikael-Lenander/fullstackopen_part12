const listHelpers = require('../utils/list_helpers')
const {oneBlog, manyBlogs, manyBlogs2} = require('./test_helper').blogs

test('dummy returns one', () => {
    const blogs = []

    const result = listHelpers.dummy(blogs)
    expect(result).toBe(1)
})

describe('Function totalLikes', () => {
    const totalLikes = listHelpers.totalLikes

    test('should return sum of all likes when called with many blogs', () => {
        expect(totalLikes(manyBlogs)).toBe(29)
    })
    test('should return sum of one blog when called with one blog', () => {
        expect(totalLikes(oneBlog)).toBe(7)
    })
    test('should return 0 when called with an empty array', () => {
        expect(totalLikes([])).toBe(0)
    })
})

describe('Function favoriteBlog', () => {
    const favoriteBlog = listHelpers.favoriteBlog

    test('should return blog with most likes when called with many blogs', () => {
        expect(favoriteBlog(manyBlogs)).toEqual(manyBlogs[1])
    })
    test('should return the one blog when called with one blog', () => {
        expect(favoriteBlog(oneBlog)).toEqual(oneBlog[0])
    })
    test('should return null when called with an empty array', () => {
        expect(favoriteBlog([])).toBeNull()
    })
})

describe('Function mostBlogs', () => {
    const mostBlogs = listHelpers.mostBlogs

    test('should return the author with most blogs and number of blogs when called with many blogs', () => {
        expect(mostBlogs(manyBlogs)).toEqual({author: "Robert C. Martin", blogs: 3})
    })
    test('should return the author of the blog and blog count "1" when called with one blog', () => {
        expect(mostBlogs(oneBlog)).toEqual({author: "Michael Chan", blogs: 1})
    })
    test('should return null when called with an empty array', () => {
        expect(mostBlogs([])).toBeNull()
    })
    test('should return one author object even if many authors have the same number of blogs', () => {
        const result = mostBlogs(manyBlogs2)
        expect(result).not.toBe(expect.any(Array))
        expect(result).toHaveProperty('author')
        expect(result).toHaveProperty('blogs')
    })
})

describe('Function mostLikes', () => {
    const mostLikes = listHelpers.mostLikes

    test('should return author with most likes and the number of likes when called with many blogs', () => {
        expect(mostLikes(manyBlogs)).toEqual({author: "Edsger W. Dijkstra", likes: 17})
    })
    test('should return the author and the number of likes of the blog when called with one blog', () => {
        expect(mostLikes(oneBlog)).toEqual({author: "Michael Chan", likes: 7})
    })
    test('should return null when called with an empty array', () => {
        expect(mostLikes([])).toBeNull()
    })
    test('should return one author object even if many authors have the same number of blogs', () => {
        const result = mostLikes(manyBlogs2)
        expect(result).not.toBe(expect.any(Array))
        expect(result).toHaveProperty('author')
        expect(result).toHaveProperty('likes')
    })
})