const { readFileSync } = require('fs')

function readFile(filename) {
    if (filename == null) return null
    return readFileSync(filename, 'utf-8')
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const DB_URI = (() => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return readFile(process.env.DB_URI_FILE)
        case 'test':
            return readFile(process.env.TEST_DB_URI_FILE)
        case 'development':
            return process.env.LOCAL_DB_URI
    }
})()

const ACCESS_TOKEN_SECRET = readFile(process.env.ACCESS_TOKEN_SECRET_FILE)

console.log('ACCESS_TOKEN_SECRET', ACCESS_TOKEN_SECRET)
console.log('DB_URI', DB_URI)

module.exports = {
    DB_URI,
    ACCESS_TOKEN_SECRET
}