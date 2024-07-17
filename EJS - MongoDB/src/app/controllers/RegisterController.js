const bcrypt = require('bcrypt');

const Users = require('../models/Users')

class RegisterController
{
    // [GET] /register
    async register(req, res, next)
    {
        try {
            await res.render('register', {
                style: [
                    '/css/site.css',
                    '/css/bootstrap.min.css',
                    '/css/style.css'
                ],
                script: [
                    '/js/bootstrap.bundle.min.js',
                    '/js/site.js',
                    '/js/jquery.min.js'
                ],
                title: 'Register',
                usernameExisted: req.session.usernameExistedError
            })

            req.session.destroy()
            res.clearCookie('connect.sid'); // Clear the session cookie
        } catch (error) {
            next(error)
        }
    }

    // [POST] /register
    async register_processing(req, res, next)
    {
        req.session.usernameExistedError = false
        req.session.userSuccessfullyCreated = false
        try {
            const { name, username, password } = req.body
            const userCheck = await Users.findOne({ username: username })

            if (userCheck) {
                req.session.usernameExistedError = true
                return res.redirect('/register?error=err');
            }
            else {
                // Hashing + Salting
                const saltRounds = 10; // Min: 10 = Enough, Max: 12 = Slower performance but better security
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const newUser = new Users({ name, username, password: hashedPassword });
                // const newUser = new Users({ name, username, password })
                await newUser.save()

                req.session.userSuccessfullyCreated = true

                return res.redirect('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new RegisterController