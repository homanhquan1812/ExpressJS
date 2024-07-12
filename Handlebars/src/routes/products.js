const express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');

router.get('/', ProductsController.show_products)
router.get('/add', ProductsController.add_a_product)
router.get('/edit/:id', ProductsController.edit_a_product)

router.post('/add', ProductsController.save_a_product)

router.put('/edit/:id', ProductsController.update_a_product)

router.delete('/:id', ProductsController.delete_a_product)

module.exports = router;