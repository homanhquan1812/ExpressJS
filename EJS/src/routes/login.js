const express = require('express')
const router = express.Router()
const loginController = require('../app/controllers/LoginController')
const loginLimiter = require('../util/rate_limit')

router.get('/', loginController.login)
router.post('/', loginLimiter, loginController.login_processing)

module.exports = router