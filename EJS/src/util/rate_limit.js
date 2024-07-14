const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max limit: 5 times,
    handler: (req, res, next) => {
        res.render('attemptsexceeded', { 
            layout: false,
            header: false,
            footer: false,
            style: '/css/error.css'
        })
    },
    // message: 'Too many login attempts from this IP, please try again after 15 minutes'
})

module.exports = loginLimiter