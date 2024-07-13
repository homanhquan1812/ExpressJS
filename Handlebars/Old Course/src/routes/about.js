const express = require('express')
const router = express.Router()

const aboutController = require('../app/controllers/AboutController')

router.get('/:slug', aboutController.show)
router.get('/', aboutController.index)

module.exports = router