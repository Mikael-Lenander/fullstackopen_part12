const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
    if (blogs.length === 0) return null
    return blogs.reduce((maxBlog, blog) => maxBlog.likes < blog.likes ? blog : maxBlog, blogs[0])
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return null
    const counted = _.countBy(blogs, blog => blog.author)
    const authors = _.reduce(counted, (arr, blogs, author) => arr.concat({ author, blogs }), [])
    return _.maxBy(authors, obj => obj.blogs)
}

const mostLikes = blogs => {
    if (blogs.length === 0) return null
    const grouped = _.groupBy(blogs, blog => blog.author)
    const likes = _.reduce(grouped, (arr, blogs, author) =>
        arr.concat({
            author,
            likes: blogs.reduce((sum, blog) => sum + blog.likes, 0)
        }), [])
    return _.maxBy(likes, obj => obj.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
