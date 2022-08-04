const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

router.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if ([username, name, password].some(param => !param)) return res.status(400).json({ error: 'Credentials missing' })
    if (password?.length < 3) return res.status(400).json({ error: 'Password should be at least 3 characters' })

    const currentUser = await User.findOne({ username })
    if (currentUser) return res.status(400).json({ error: 'Username taken' })

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ username, name, passwordHash })
    const user = await newUser.save()
    res.json(user)
})

router.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    res.json(users)
})

module.exports = router