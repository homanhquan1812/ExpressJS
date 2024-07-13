const FirstDatabase = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController
{
    // [GET] /courses/:slug
    show(req, res, next)
    {
        FirstDatabase.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course)})
            })
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next)
    {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next)
    {
        const formData = req.body
        formData.name = `This course is ${req.body.name}.`
        const course = new FirstDatabase(formData)
        course.save()
            .then(() => res.redirect('/about'))
            .catch(error => {

            })
    }

    // [GET] /courses/edit
    edit(req, res, next)
    {
        FirstDatabase.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next)
    {
        FirstDatabase.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next)
    {
        FirstDatabase.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [RESTORE] /courses/:id/restore
    restore(req, res, next)
    {
        FirstDatabase.restore({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [FORCE DELETE] /courses/:id/force
    forceDelete(req, res, next)
    {
        FirstDatabase.deleteOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next)
    {
        switch(req.body.action)
        {
            case 'delete':
                FirstDatabase.delete({_id: { $in: req.body.courseIDs }})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is invalid.'})
        }
    }
}

module.exports = new CourseController