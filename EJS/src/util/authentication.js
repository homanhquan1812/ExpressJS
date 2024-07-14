/* Session Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.name) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = isAuthenticated
*/

// JWT Authentication Middleware
const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    const token = req.session.jwt

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        req.user = user
        next()
    })
}

module.exports = isAuthenticated