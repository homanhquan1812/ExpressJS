const FirstDatabase = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class MeController
{
    // [GET] /me/stored/courses
    storedCourses(req, res, next)
    {
        Promise.all([FirstDatabase.find({}), FirstDatabase.countDocumentsWithDeleted({deleted: true})])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', {
                deletedCount,
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next)
    {
        FirstDatabase.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }


}

module.exports = new MeController