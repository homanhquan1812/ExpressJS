const express = require('express')
const router = express.Router()
const ProductsController = require('../app/controllers/ProductsController')
const isAuthenticated = require('../util/middleware')

router.get('/',isAuthenticated, ProductsController.show_products)
router.get('/add', isAuthenticated, ProductsController.add_a_product)
router.get('/edit/:id', isAuthenticated, ProductsController.edit_a_product)
router.post('/add', ProductsController.save_a_product)
router.put('/edit/:id', ProductsController.update_a_product)
router.delete('/:id', ProductsController.delete_a_product)

module.exports = router