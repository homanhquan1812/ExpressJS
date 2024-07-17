class LogoutController {
    // [GET] /logout
    async logout(req, res, next) {
        try {
            req.session.destroy()
            res.clearCookie('connect.sid'); // Clear the session cookie
            return res.redirect('/');
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LogoutController