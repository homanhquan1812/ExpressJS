const FirstDatabase = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class AboutController
{
    // [GET] /about
    index(req, res, next)
    {
        FirstDatabase.find({})
            .then(firstdatabases => {
                res.render('about', { 
                    firstdatabases: multipleMongooseToObject(firstdatabases)
                })
            })
            .catch(next)
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Contact us: expressjs@gmail.com');
    }
}

module.exports = new AboutController