const mongoose = require('mongoose')

const Schema = mongoose.Schema

const timetableSchema = new Schema({
    course:{
        type: String,
        required: true
    },
    tracks:[{
        track: String,
        sem1: Array,
        sem2: Array,
        sem3: Array,
        sem4: Array,
        sem5: Array,
        sem6: Array,
        sem7: Array,
        sem8: Array
    }]
})

module.exports = mongoose.model('Timetable', timetableSchema)