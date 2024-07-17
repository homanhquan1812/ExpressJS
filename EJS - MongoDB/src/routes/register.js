const express = require('express')
const router = express.Router()
const registerController = require('../app/controllers/RegisterController')

router.get('/', registerController.register)
router.post('/', registerController.register_processing)

module.exports = router