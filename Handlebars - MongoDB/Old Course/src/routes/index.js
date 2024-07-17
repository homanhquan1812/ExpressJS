const aboutRouter = require('./about')
const coursesRouter = require('./courses')
const meRouter = require('./me')

function route(app)
{
    app.use('/about', aboutRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
}

module.exports = route