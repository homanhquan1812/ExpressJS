const mongoose = require('mongoose')
// const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Users = new Schema({
    name: { type: String, maxLength: 255, required: true },
    username: { type: String, maxLength: 255, required: true },
    password: { type: String, maxLength: 255, required: true }
}, { timestamps: true });

/*
users.plugin(mongoose_delete, { 
    deletedAt: true,
    overrideMethods: 'all'
});
*/

module.exports = mongoose.model('users', Users)