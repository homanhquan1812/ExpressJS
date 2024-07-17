const loginRouter = require('./login')
const registerRouter = require('./register')
const productsRouter = require('./products')

function route(app) {
    app.use('/products', productsRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route