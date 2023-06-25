const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userTimetableSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    sem1: {
        type: Array
    },
    sem2: {
        type: Array
    },
    sem3: {
        type: Array
    },
    sem4: {
        type: Array
    },
    sem5: {
        type: Array
    },
    sem6: {
        type: Array
    },
    sem7: {
        type: Array
    },
    sem8: {
        type: Array
    }
    
})

module.exports = mongoose.model('Timetable', userTimetableSchema)