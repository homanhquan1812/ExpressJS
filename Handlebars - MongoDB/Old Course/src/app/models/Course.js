const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FirstDatabase = new Schema({
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600},
    videoID: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

FirstDatabase.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('firstdatabase', FirstDatabase)