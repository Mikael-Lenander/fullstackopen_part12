const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../utils/config')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!(username && password)) return res.status(400).json({ error: 'Credentials missing' })
    const user = await User.findOne({ username })
    const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) return res.status(401).json({ error: 'Invalid username or password' })

    const userData = { id: user._id, username: user.username }
    const token = jwt.sign(userData, ACCESS_TOKEN_SECRET)
    res.json({ username: user.username, name: user.name, token })
})

module.exports = router