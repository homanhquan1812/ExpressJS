const express = require('express')
const router = express.Router()
const logoutController = require('../app/controllers/LogoutController')
const isAuthenticated = require('../util/middleware')

router.get('/', isAuthenticated, logoutController.logout)

module.exports = router