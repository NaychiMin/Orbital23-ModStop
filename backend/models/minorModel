const mongoose = require('mongoose')

const Schema = mongoose.Schema

const minorSchema = new Schema({
    minor: {
        type: String,
        required: true,
        unique: true
    },
    courses: {
        type: Array,
        required: true
    },
    cores: {
        type: Array,
        required: true
    },
    electives: {
        type: Array,
        required: true
    },
    details: {
        type: String
    }
})

module.exports = mongoose.model('Minors', minorSchema)