const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        const { username, password } = req.body

        try {
            // Find a user
            const usernameMatch = await Users.findOne({ username: username })
            
            if (!usernameMatch) {
                return res.status(401).json({
                    message: 'This username doesn\'t exists.'
                })
            }

            // Check user's password
            const isMatch = await bcrypt.compare(password, usernameMatch.password)

            if (!isMatch) {
                return res.status(401).json({
                    message: 'Password is incorrect.'
                })
            }

            const token = jwt.sign({ id: usernameMatch._id, username: usernameMatch.username, name: usernameMatch.name }, process.env.SECRET_KEY, { expiresIn: '1h' })
  
            // Send JWT token and user info as JSON response
            res.json({
                message: 'Login successful',
                token: token,
                user: {
                    username: usernameMatch.username,
                    name: usernameMatch.name
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController