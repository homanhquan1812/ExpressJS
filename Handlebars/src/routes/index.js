const homeRouter = require('./home')
const loginRouter = require('./login')
const registerRouter = require('./register')
const productsRouter = require('./products')
const logoutRouter = require('./logout')

function route(app) {
    app.use('/', homeRouter)
    app.use('/products', productsRouter)
    app.use('/login', loginRouter)
    app.use('/logout', logoutRouter)
    app.use('/register', registerRouter)
    // Undefined routes
    app.use((req, res) => {
        res.render('error', { 
            layout: false,
            header: false,
            footer: false,
            style: '/css/error.css'
        })
    })

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route