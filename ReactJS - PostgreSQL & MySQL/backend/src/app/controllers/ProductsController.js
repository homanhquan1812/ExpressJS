const { pool } = require('../../../config/mysql')

class ProductsController
{
    /*
     * 1. Show all products
    */
    // [GET] /products
    async show_products(req, res, next)
    {
        try {
            /* PostgreSQL
            const query = 'SELECT * FROM products'
            const result = await pool.query(query)

            res.status(200).json({
                products: result.rows
            })
            */

            /* MySQL */
            const query = 'SELECT * FROM products'
            const [rows] = await pool.query(query)

            res.status(200).json({
                products: rows
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
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
            /* PostgreSQL
            const query = 'INSERT INTO products (csw_products, type, description, price, createdAt) VALUES ($1, $2, $3, $4, $5)'
            */
           
            /* MySQL */
            const query = 'INSERT INTO products (csw_products, type, description, price, createdAt) VALUES (?, ?, ?, ?, ?)'
            await pool.query(query, [csw_products, type, description, price, createdAt])

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
            /* PostgreSQL        
            const query = 'SELECT * FROM products WHERE id = $1'
            const result = await pool.query(query, [req.params.id])

            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: "No product found!"
                })
            }

            res.status(200).json({
                productID: result.rows[0]
            })
            */

            /* MySQL */
            const query = 'SELECT * FROM products WHERE id = ?'
            const [rows] = await pool.query(query, [req.params.id])

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "No product found!"
                })
            }

            res.status(200).json({
                productID: rows[0]
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /products/edit/:id
    async update_a_product(req, res, next) {
        try {
            const { csw_products, type, description, price } = req.body
            /* PostgreSQL
            const query = 'UPDATE products SET csw_products = $1, type = $2, description = $3, price = $4 WHERE id = $5'
            const result = await pool.query(query, [csw_products, type, description, price, req.params.id])
            

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "No product found!"
                })
            }
            */

            /* MySQL */
            const query = 'UPDATE products SET csw_products = ?, type = ?, description = ?, price = ? WHERE id = ?';
            const [result] = await pool.query(query, [csw_products, type, description, price, req.params.id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "No product found!"
                });
            }

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
            /* PostgreSQL
            const query = 'DELETE FROM products WHERE id = $1'
            const result = await pool.query(query, [req.params.id])

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "No product found!"
                })
            }
            */

            /* MySQL */
            const query = 'DELETE FROM products WHERE id = ?';
            const [result] = await pool.query(query, [req.params.id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "No product found!"
                });
            }

            res.status(200).json({
                message: "Product deleted successfully!"
            }) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductsController