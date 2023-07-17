const mongoose = require('mongoose')

const Schema = mongoose.Schema

const majorSchema = new Schema({
    major: {
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

module.exports = mongoose.model('Majors', majorSchema)