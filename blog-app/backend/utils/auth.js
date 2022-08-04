const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('./config.js')

const userExtractor = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token == null) {
        console.log('token is null')
        return res.status(401).json({ error: 'Unauthorized' })
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('token verification failed')
            return res.status(401).json({ error: 'Unauthorized' })
        }
        req.user = user
        next()
    })
}

module.exports = { userExtractor }