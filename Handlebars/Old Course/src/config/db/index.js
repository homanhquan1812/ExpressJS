const mongoose = require('mongoose')

async function connect()
{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase') // Don't replace 127.0.0.1 with localhost, cause it won't work
        console.log('Connected successfully.')
    } catch (error) {
        console.log('Failed to connect.')
    }
}

module.exports = { connect }