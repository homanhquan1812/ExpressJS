const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const { multipleMongooseToObject } = require('../../util/mongoose');

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { name, username, password } = req.body
            const userCheck = await Users.findOne({ username: username })

            if (userCheck) {
                res.status(401).json({
                    message: 'This user already exists.'
                })
            }
            else {
                // Hashing + Salting
                const saltRounds = 10; // Min: 10 = Enough, Max: 12 = Slower performance but better security
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = new Users({ name, username, password: hashedPassword });
                await newUser.save()

                req.session.userSuccessfullyCreated = true

                res.status(201).json({
                    message: 'Registered successfully!'
                })

            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController