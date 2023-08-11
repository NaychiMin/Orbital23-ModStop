const mongoose = require('mongoose')

const Schema = mongoose.Schema

const modTableSchema = new Schema({
    module: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mcs: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ModuleTable', modTableSchema)