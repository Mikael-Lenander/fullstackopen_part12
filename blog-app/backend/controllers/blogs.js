const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/auth')

router.get('/', async (req, res) => {
  const result = await Blog.find({})
    .populate('user', { id: 1, username: 1, name: 1 })
  res.json(result)
})

router.post('/', userExtractor, async (req, res) => {
  const blogData = req.body
  const user = await User.findById(req.user.id)

  const newBlog = new Blog({ ...blogData, user: user._id })
  const blog = await newBlog.save()

  await User.updateOne({ _id: user._id }, { blogs: [...user.blogs, blog.id] })

  res.status(201).json(blog)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(403).send({ error: 'Deletion of other users\' blogs forbidden' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const updatedParams = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedParams, { new: true })
  res.json(updatedBlog)
})

module.exports = router