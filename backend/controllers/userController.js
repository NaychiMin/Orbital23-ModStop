const User = require('../models/userModel')
const Minor = require('../models/minorModel')
const Module = require('../models/moduleModel')
const Major = require('../models/majorModel')
const Timetable = require('../models/timetableModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        const username = user.username

        const course = user.course

        res.status(200).json({email, course, username, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

//sign up user
const signupUser = async (req, res) => {
    const {email, password, username, course, track} = req.body

    try{
        const user = await User.signup(email, password, username, course, track)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, username, course, track})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

//get minors
const getMinors = async (req, res) => {
    const minors = await Minor.find()
    if (!minors) {
        res.json({mssg: 'no minors'})
    }
    else {
        res.status(200).json(minors)
    }
}

//get minor modules
const getModules = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such minor'})
    }

    const minor = await Minor.findById(id)

    if(!minor) {
        return res.status(404).json({error: 'No such minor'})
    }

    res.status(200).json(minor)
}

//get module info
const getModuleInfo = async (req, res) => {
    const module = await Module.find()
    if(!module) {
        return res.status(404).json({error: 'No such module'})
    }
    res.status(200).json(module)
}

//get majors
const getMajors = async (req, res) => {
    const majors = await Major.find()
    if (!majors) {
        res.json({mssg: 'no majors'})
    }
    else {
        res.status(200).json(majors)
    }
}

//get timetable
const getTimetable = async (req, res) => {
    const course = req.user.course
    const timetable = await Timetable.find({"course" : course})
    if(!timetable) {
        return res.status(404).json({error: 'No timetables'})
    }
    res.status(200).json(timetable)
}

module.exports = {signupUser, loginUser, getMinors, getModules, getModuleInfo, getTimetable, getMajors}