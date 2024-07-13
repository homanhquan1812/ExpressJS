const bcrypt = require('bcrypt');
const Users = require('../models/Users')

class LoginController
{
    // [GET] /login
    async login(req, res, next)
    {
        try {
            await res.render('login', {
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
                title: 'Login',
                userCreated: req.session.userSuccessfullyCreated,
                loginErr: req.session.loginError
            })

            req.session.destroy()
            res.clearCookie('connect.sid'); // Clear the session cookie
        } catch (error) {
            next(error)
        }
    }

    // [POST] /login
    async login_processing(req, res, next) {
        req.session.loginError = false
        req.session.logged = false
        const { username, password } = req.body

        try {
            // Find a user
            const usernameMatch = await Users.findOne({ username: username })
            
            if (!usernameMatch) {
                req.session.loginError = true
                return res.redirect('/login?error=err');
            }
            else {
                // Check user's password
                const isMatch = await bcrypt.compare(password, usernameMatch.password);
                if (!isMatch) {
                    req.session.loginError = true
                    return res.redirect('/login?error=err');
                }
                else {
                    req.session.username = usernameMatch.username
                    req.session.name = usernameMatch.name
                    req.session.cookie.expires = new Date(Date.now() + req.session.cookie.maxAge)
                    req.session.cookie.maxAge = 5 * 60 * 1000 // 5 minutes
                    req.session.logged = true // For header

                    return res.redirect('/')
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController