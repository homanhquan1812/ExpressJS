const isAuthenticated = (req, res, next) => {
    if (req.session.name) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = isAuthenticated;
