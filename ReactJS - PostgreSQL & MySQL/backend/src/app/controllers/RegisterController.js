const { pool } = require('../../../config/mysql')
const bcrypt = require('bcrypt')

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { name, username, password } = req.body
            /* PostgreSQL
            const userCheckQuery = 'SELECT * FROM users WHERE username = $1'
            const userCheck = await pool.query(userCheckQuery, [username])

            if (userCheck.rows.length > 0) {
                return res.status(401).json({
                    message: 'This user already exists.'
                })
            }
            */

            /* MySQL */
            const userCheckQuery = 'SELECT * FROM users WHERE username = ?'
            const [userCheck] = await pool.query(userCheckQuery, [username])

            if (userCheck.length > 0) {
                return res.status(401).json({
                    message: 'This user already exists.'
                })
            }

            // Hashing + Salting
            const saltRounds = 10 // Min: 10 = Enough, Max: 12 = Slower performance but better security
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            /* PostgreSQL
            const insertUserQuery = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id'
            await pool.query(insertUserQuery, [name, username, hashedPassword])
            */

            /* MySQL */
            const insertUserQuery = 'INSERT INTO users (name, username, password) VALUES (?, ?, ?)'
            await pool.query(insertUserQuery, [name, username, hashedPassword])

            res.status(201).json({
                message: 'Registered successfully!'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController