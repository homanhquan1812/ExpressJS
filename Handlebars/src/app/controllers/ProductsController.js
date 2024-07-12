const Products = require('../models/Products')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class ProductsController
{
    /*
     * 1. Show products
    */
    // [GET] /products
    async show_products(req, res, next)
    {
        const products = await Products.find({})
        try {
            await res.render('show_products', {
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
                title: 'Products',
                products: multipleMongooseToObject(products)
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Add a product
    */
    // [GET] /products/add
    async add_a_product(req, res, next) {
        try {
            await res.render('add_a_product', {
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
                title: 'Add a product'
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /products/add
    async save_a_product(req, res, next) {
        try {
            const { csw_products, type, description, price } = req.body
            const newProduct = new Products({ csw_products, type, description, price })
            await newProduct.save()
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    /*
     * 3. Edit a product
    */
    // [GET] /products/edit/:id
    async edit_a_product(req, res, next)
    {
        const productID = await Products.findById(req.params.id)
        // Another method: const productID = await Products.findOne({ id: req.params.id})
        try {
            await res.render('edit_a_product', {
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
                title: 'Edit Products',
                productID: mongooseToObject(productID)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /products/edit/:id
    async update_a_product(req, res, next) {
        try {
            const { csw_products, type, description, price } = req.body
            await Products.findByIdAndUpdate(req.params.id, {
                csw_products, type, description, price
            })
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    /*
     * 4. Delete a product
    */
    // [POST] /products/:id
    async delete_a_product(req, res, next) {
        try {
            await Products.findByIdAndDelete(req.params.id)

            /*
             * Mongoose Delete:
                const product = await Products.findById(req.params.id);
                await product.delete();
                res.redirect('/products')
            */
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductsController