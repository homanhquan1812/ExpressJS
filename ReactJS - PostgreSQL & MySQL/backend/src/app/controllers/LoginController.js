const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../../../config/mysql')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        const { username, password } = req.body

        try {
            // Find a user
            /* PostgreSQL
            const query = 'SELECT * FROM users WHERE username = $1'
            const result = await pool.query(query, [username])
            
            if (result.rows.length === 0) {
                return res.status(401).json({
                    message: 'This username doesn\'t exists.'
                })
            }

            const user = result.rows[0]
            */

            /* MySQL */
            const query = 'SELECT * FROM users WHERE username = ?'
            const [rows] = await pool.query(query, [username])

            if (rows.length === 0) {
                return res.status(401).json({
                    message: 'This username doesn\'t exist.'
                })
            }

            const user = rows[0]

            // Check user's password
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({
                    message: 'Password is incorrect.'
                })
            }
            
            const token = jwt.sign({ id: user.id, username: user.username, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' })
      
            // Send JWT token and user info as JSON response
            res.json({
                message: 'Login successful',
                token: token,
                user: {
                    username: user.username,
                    name: user.name
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController