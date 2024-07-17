const Products = require('../models/Products')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class ProductsController
{
    /*
     * 1. Show all products
    */
    // [GET] /products
    async show_products(req, res, next)
    {
        try {
            const products = await Products.find({})

            res.status(200).json({
                products: multipleMongooseToObject(products)
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Add a product
    */
    // [POST] /products/add
    async save_a_product(req, res, next) {
        try {
            const { csw_products, type, description, price } = req.body
            const newProduct = new Products({ csw_products, type, description, price })
            await newProduct.save()

            res.status(201).json({
                message: "Product added successfully!"
            })
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
        try {        
            const productID = await Products.findById(req.params.id)
            // Another method: const productID = await Products.findOne({ id: req.params.id})

            if (!productID) {
                return res.status(404).json({
                    message: "No product found!"
                })
            }

            res.status(200).json({
                productID: mongooseToObject(productID)
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /products/edit/:id
    async update_a_product(req, res, next) {
        try {
            const { csw_products, type, description, price } = req.body

            await Products.findByIdAndUpdate(req.params.id, {
                csw_products, type, description, price
            })
            
            res.status(200).json({
                message: "Product updated successfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 4. Delete a product
    */
    // [DELETE] /products/:id
    async delete_a_product(req, res, next) {
        try {
            await Products.findByIdAndDelete(req.params.id)
            /*
             * Mongoose Delete:
                const product = await Products.findById(req.params.id);
                await product.delete();
            */

            res.status(200).json({
                message: "Product deleted successfully!"
            })    
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductsController