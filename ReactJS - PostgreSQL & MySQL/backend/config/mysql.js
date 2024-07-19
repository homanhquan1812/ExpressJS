require('dotenv').config()

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME
})

async function connect() {
    try {
        const connection = await pool.getConnection()
        console.log('Database connected successfully.')
        connection.release()
    } catch (error) {
        console.error('Failed to connect to database.', error)
    }
}

module.exports = { connect, pool }